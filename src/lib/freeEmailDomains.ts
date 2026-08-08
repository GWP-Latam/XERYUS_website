// Dominios de correo gratuito/personal más comunes: el formulario de contacto
// exige un correo corporativo, así que estos dominios quedan bloqueados.
export const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com',
  'hotmail.com', 'hotmail.es', 'hotmail.co.uk', 'hotmail.fr',
  'outlook.com', 'outlook.es', 'live.com', 'live.com.mx', 'msn.com',
  'yahoo.com', 'yahoo.com.mx', 'yahoo.es', 'ymail.com',
  'icloud.com', 'me.com', 'mac.com',
  'aol.com', 'protonmail.com', 'proton.me', 'gmx.com', 'zoho.com',
  'mail.com', 'yandex.com', 'rocketmail.com',
]);

export function isCorporateEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split('@')[1];
  if (!domain) return false;
  return !FREE_EMAIL_DOMAINS.has(domain);
}
