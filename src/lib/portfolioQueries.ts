import type { SanityImageSource } from '@sanity/image-url';
import { sanityClient } from './sanityClient';

export interface PortfolioCase {
  _id: string;
  client: string;
  projectTitle: string;
  description: string;
  objectives: string;
  results: string[];
  industry: string;
  color: string;
  featured: boolean;
  coverImage?: SanityImageSource;
  logo?: SanityImageSource;
}

const QUERY = `*[_type == "portfolioCase"] | order(featured desc, order asc) {
  _id, client, projectTitle, description, objectives, results, industry, color, featured, coverImage, logo
}`;

export function fetchPortfolioCases(): Promise<PortfolioCase[]> {
  return sanityClient.fetch(QUERY);
}
