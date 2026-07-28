/**
 * Sincroniza la base de "Colaboradores" de Notion (compartida con WeProm) con
 * el Sanity de XERYUS (teamMember), filtrando solo a quienes tengan marcado
 * el checkbox "Página XERYUS" en Notion.
 *
 * Diseñado para correr en un cron (GitHub Actions), NUNCA desde el navegador:
 * - Usa la API oficial de Notion (no el MCP) para obtener la foto de portada real.
 * - Es idempotente: usa `notionId` para actualizar en vez de duplicar documentos.
 * - Solo vuelve a descargar/subir la foto si `last_edited_time` cambió en Notion,
 *   para no acumular assets huérfanos en Sanity en cada corrida.
 * - La visibilidad pública y el orden se gestionan 100% desde Notion:
 *     "Página XERYUS" (checkbox) → active
 *     "Orden web" (number)       → order
 * - Nunca borra documentos: si alguien se desmarca, solo se oculta (active=false).
 *
 * Env vars requeridas:
 *   NOTION_TOKEN   - integration token con acceso a la base "Colaboradores"
 *   SANITY_TOKEN   - token de Sanity (proyecto 6jxanxar) con permiso de escritura
 *
 * Usage:
 *   NOTION_TOKEN=... SANITY_TOKEN=... node scripts/sync-team-from-notion.mjs
 */

import { createClient } from '@sanity/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const SANITY_TOKEN = process.env.SANITY_TOKEN;
const DATABASE_ID = '25b01c41-7bab-8010-a633-d22a877f0fd8';
const NOTION_VERSION = '2022-06-28';

if (!NOTION_TOKEN || !SANITY_TOKEN) {
  console.error('❌  Set NOTION_TOKEN and SANITY_TOKEN env vars before running this script.');
  process.exit(1);
}

const sanity = createClient({
  projectId: '6jxanxar',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: SANITY_TOKEN,
  useCdn: false,
});

async function queryNotionDatabase() {
  const pages = [];
  let cursor;
  do {
    const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ start_cursor: cursor, page_size: 100 }),
    });
    if (!res.ok) throw new Error(`Notion query failed: HTTP ${res.status} ${await res.text()}`);
    const data = await res.json();
    pages.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return pages;
}

function extractName(page) {
  return page.properties?.Nombre?.title?.map(t => t.plain_text).join('') || '';
}

function extractRole(page) {
  const opts = page.properties?.Puesto?.multi_select || [];
  return opts.length > 0 ? opts[0].name : null;
}

function extractRichText(page, propName) {
  const rich = page.properties?.[propName]?.rich_text || [];
  const text = rich.map(t => t.plain_text).join('').trim();
  return text || undefined;
}

function extractEmail(page) {
  return page.properties?.['Correo Institucional']?.email || undefined;
}

function extractShowOnXeryus(page) {
  return page.properties?.['Página XERYUS']?.checkbox === true;
}

function extractWebOrder(page) {
  const n = page.properties?.['Orden web']?.number;
  return typeof n === 'number' ? n : null;
}

function extractCoverUrl(page) {
  if (!page.cover) return null;
  if (page.cover.type === 'file') return page.cover.file.url;
  if (page.cover.type === 'external') return page.cover.external.url;
  return null;
}

async function uploadPhoto(url, name) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} al descargar foto de ${name}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await sanity.assets.upload('image', buffer, { filename: `${name.replace(/\s+/g, '-')}.png` });
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

async function main() {
  console.log('🔍  Consultando base "Colaboradores" en Notion...');
  const notionPages = await queryNotionDatabase();
  console.log(`   ${notionPages.length} páginas encontradas en Notion.`);

  console.log('🔍  Consultando documentos existentes en Sanity...');
  const existing = await sanity.fetch(`*[_type == "teamMember" && defined(notionId)]{ _id, notionId, notionLastEdited }`);
  const existingByNotionId = new Map(existing.map(e => [e.notionId, e]));

  const people = notionPages.map(page => ({
    notionId: page.id,
    name: extractName(page),
    role: extractRole(page),
    email: extractEmail(page),
    description: extractRichText(page, 'Descripción'),
    showOnWeb: extractShowOnXeryus(page),
    webOrder: extractWebOrder(page),
    coverUrl: extractCoverUrl(page),
    lastEdited: page.last_edited_time,
  })).filter(p => p.name);

  // Orden: primero quienes tienen "Orden web" explícito (ascendente), luego el resto por nombre.
  const withOrder = people.filter(p => p.webOrder !== null).sort((a, b) => a.webOrder - b.webOrder);
  const withoutOrder = people.filter(p => p.webOrder === null).sort((a, b) => a.name.localeCompare(b.name));
  const ordered = [...withOrder, ...withoutOrder];

  console.log(`\n🚀  Procesando ${ordered.length} colaboradores (${ordered.filter(p => p.showOnWeb).length} marcados con "Página XERYUS")...\n`);

  let created = 0, updated = 0, hidden = 0, skipped = 0;

  for (let i = 0; i < ordered.length; i++) {
    const p = ordered[i];
    const order = i + 1;
    const existingDoc = existingByNotionId.get(p.notionId);

    if (!p.showOnWeb) {
      if (existingDoc) {
        await sanity.patch(existingDoc._id).set({ active: false }).commit();
        console.log(`  🙈  ${p.name} desmarcado en Notion → oculto en la web.`);
        hidden++;
      }
      continue;
    }

    if (!p.role) {
      console.log(`  ⏭️   ${p.name} está marcado para mostrar pero no tiene "Puesto" asignado, se omite.`);
      skipped++;
      continue;
    }

    const needsNewPhoto = p.coverUrl && (!existingDoc || existingDoc.notionLastEdited !== p.lastEdited);
    const basePatch = {
      name: p.name,
      role: p.role,
      email: p.email,
      description: p.description,
      active: true,
      order,
      notionLastEdited: p.lastEdited,
    };

    if (existingDoc) {
      process.stdout.write(`  🔄  ${p.name}${needsNewPhoto ? ' (actualizando foto)' : ''}... `);
      if (needsNewPhoto) basePatch.photo = await uploadPhoto(p.coverUrl, p.name);
      await sanity.patch(existingDoc._id).set(basePatch).commit();
      updated++;
      console.log('✅');
    } else {
      if (!p.coverUrl) {
        console.log(`  ⏭️   ${p.name} no tiene foto de portada en Notion, se omite (agrégala y vuelve a correr el sync).`);
        skipped++;
        continue;
      }
      process.stdout.write(`  📤  ${p.name} (nuevo)... `);
      const photo = await uploadPhoto(p.coverUrl, p.name);
      await sanity.create({ _type: 'teamMember', notionId: p.notionId, photo, ...basePatch });
      created++;
      console.log('✅');
    }
  }

  console.log(`\n🎉  Listo. ${created} creado(s), ${updated} actualizado(s), ${hidden} ocultado(s), ${skipped} omitido(s).`);
}

main().catch(err => {
  console.error('❌  Error:', err.message);
  process.exit(1);
});
