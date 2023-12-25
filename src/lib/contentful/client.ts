import { createClient } from "contentful"
import { config } from 'dotenv';
config({ path: '.env.local' });

export const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})