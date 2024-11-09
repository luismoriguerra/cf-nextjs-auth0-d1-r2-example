import { NextRequest } from 'next/server'
export const runtime = 'edge';

// This page is public thanks to the middleware

export async function GET(request: NextRequest) {
    const today = new Date().toISOString();
    return new Response(JSON.stringify({ date: today }));
}
