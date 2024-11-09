import { NextRequest, NextResponse } from 'next/server'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';
export const runtime = 'edge';


export const GET = withApiAuthRequired(async function Get(req) {
  const res = new NextResponse();
  const session = await getSession();

  return NextResponse.json(session);
});