import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { isSpamSubmission } from './_antiSpam.js';
import { isCorporateEmail } from './_freeEmail.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (isSpamSubmission(req.body ?? {})) {
    // Respondemos éxito sin enviar el correo: no delatamos al bot que fue detectado.
    return res.status(200).json({ ok: true });
  }

  const { name, email, phone, company, message } = req.body ?? {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  if (!isCorporateEmail(email)) {
    return res.status(400).json({ error: 'Ingresa un correo corporativo, no de un proveedor gratuito' });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !MAIL_TO) {
    console.error('Faltan variables de entorno SMTP en Vercel');
    return res.status(500).json({ error: 'Configuración de correo incompleta' });
  }

  const port = Number(SMTP_PORT);

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const text = [
      `Origen: Sitio web XERYUS`,
      `Nombre: ${name}`,
      `Empresa: ${company || 'No especificado'}`,
      `Correo: ${email}`,
      `Teléfono: ${phone || 'No especificado'}`,
      `Mensaje: ${message || 'No especificado'}`,
    ].join('\n');

    await transporter.sendMail({
      from: `"Sitio XERYUS" <${SMTP_USER}>`,
      to: MAIL_TO,
      replyTo: email,
      subject: `Nuevo contacto XERYUS — ${company || name}`,
      text,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error enviando contacto por SMTP:', err);
    return res.status(500).json({ error: 'No se pudo enviar el correo' });
  }
}
