const CALENDLY_URL = 'https://calendly.com/contacto-grupoweprom/30min';
const XERYUS_ACCENT = 'fd3838';

export function buildCalendlyUrl() {
  return `${CALENDLY_URL}?primary_color=${XERYUS_ACCENT}`;
}

function toMexicanPhone(phone: string) {
  const t = phone.trim();
  if (t.startsWith('+')) return t;
  const d = t.replace(/[^0-9]/g, '');
  return d ? `+52 ${d}` : '';
}

export function buildCalendlyPrefill(
  name: string,
  email: string,
  phone: string,
  company: string,
  message: string,
) {
  return {
    name,
    email,
    customAnswers: {
      a1: toMexicanPhone(phone), // campo "Teléfono" en el evento de Calendly
      a2: company,               // campo "Marca/Empresa"
      a3: message,               // campo "¿Qué abordaremos en la llamada?"
    },
  };
}
