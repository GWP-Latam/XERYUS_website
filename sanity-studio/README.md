# XERYUS · Sanity Studio

Gestor de contenido para el portafolio de casos y testimonios de XERYUS. Los schemas (`portfolioCase`, `marketResearchTestimonial`) y el paquete de datos (`../xeryus-portafolio.tar.gz`, en la raíz del repo) vienen migrados desde el proyecto Sanity de WeProm (`k3wb9a79`), donde vivían junto con el resto del contenido de la agencia.

## Puesta en marcha (cuenta nueva y separada de Sanity)

1. Cierra sesión de cualquier cuenta de Sanity previa y entra con la cuenta nueva de XERYUS:
   ```bash
   npx sanity logout
   npx sanity login
   ```
2. Crea el proyecto nuevo (desde esta carpeta `sanity-studio/`):
   ```bash
   npx sanity init --create-project "XERYUS" --dataset production
   ```
   Copia el **Project ID** que te da la CLI.
3. Reemplaza `6jxanxar` por ese ID en [sanity.config.ts](sanity.config.ts) y [sanity.cli.ts](sanity.cli.ts).
4. Importa los 30 casos de portafolio + 50 testimonios (con sus imágenes) desde la raíz del repo (`WEBSITE_XERYUS/`, un nivel arriba de esta carpeta):
   ```bash
   cd ..
   npx sanity dataset import xeryus-portafolio.tar.gz production --project 6jxanxar
   ```
5. Instala dependencias y levanta el Studio:
   ```bash
   cd sanity-studio
   npm install
   npm run dev
   ```

## Notas

- `xeryus-portafolio.tar.gz` ya viene filtrado: solo contiene documentos `portfolioCase` y `marketResearchTestimonial`, con sus imágenes referenciadas (30 imágenes). No incluye el resto del contenido de WeProm (marketing digital, branding, equipo, etc.).
- Si necesitas volver a generar el paquete desde cero (por cambios nuevos en el proyecto de WeProm), pide un export completo del dataset `production` de `k3wb9a79` y filtra por esos dos tipos de documento antes de importar — el flag `--types` de `sanity dataset export` **no** arrastra las imágenes referenciadas por sí solo (es una limitación conocida del CLI), así que hay que exportar completo y filtrar después.
