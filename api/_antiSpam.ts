// Helper compartido de anti-spam para los endpoints públicos de contacto.
// El prefijo "_" evita que Vercel lo cuente como una función serverless propia.
export const HONEYPOT_FIELD = 'website_url';
const MIN_ELAPSED_MS = 3000;

export function isSpamSubmission(body: Record<string, unknown>): boolean {
  // Honeypot: campo invisible para personas, pero los bots que rellenan
  // formularios automáticamente sí lo detectan y lo llenan.
  const honeypot = body[HONEYPOT_FIELD];
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return true;
  }

  // Los bots suelen rellenar y enviar el formulario en menos de un segundo;
  // una persona real tarda varios segundos en escribir sus datos.
  const startedAt = Number(body.formStartedAt);
  if (startedAt && !Number.isNaN(startedAt) && Date.now() - startedAt < MIN_ELAPSED_MS) {
    return true;
  }

  return false;
}
