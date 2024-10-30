import type { NextRequest } from 'next/server'
// import { getRequestContext } from '@cloudflare/next-on-pages'
import { executeQuery } from '../../../../server/db/d1';

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  // Get name from query parameters
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  // Build query based on whether name is provided
  const query = name 
    ? "SELECT * FROM users WHERE name LIKE ?"
    : "SELECT * FROM users";
  
  const response = await executeQuery(query, name ? [`%${name}%`] : []);
  return new Response(JSON.stringify(response));
}
