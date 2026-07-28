import type { SanityImageSource } from '@sanity/image-url';
import { sanityClient } from './sanityClient';

export interface TeamMember {
  _id: string;
  order: number;
  name: string;
  role: string;
  email?: string;
  description?: string;
  photo: SanityImageSource;
}

const QUERY = `*[_type == "teamMember" && active == true] | order(order asc) {
  _id, order, name, role, email, description, photo
}`;

export function fetchTeamMembers(): Promise<TeamMember[]> {
  return sanityClient.fetch(QUERY);
}
