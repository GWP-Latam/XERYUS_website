import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: '6jxanxar',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
});
