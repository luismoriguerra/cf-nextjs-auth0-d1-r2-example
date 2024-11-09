import { NextRequest, NextResponse } from 'next/server'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';
export const runtime = 'edge';


// export const GET = withApiAuthRequired(async function Get(req) {
//   const res = new NextResponse();
//   const session = await getSession();

//   return NextResponse.json(session);
// });

export async function GET(request: NextRequest) {
    let responseText = 'Hello World'

    // In the edge runtime you can use Bindings that are available in your application
    // (for more details see:
    //    - https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/#use-bindings-in-your-nextjs-application
    //    - https://developers.cloudflare.com/pages/functions/bindings/
    // )
    //
    // KV Example:
    // const myKv = getRequestContext().env.MY_KV_NAMESPACE
    // await myKv.put('suffix', ' from a KV store!')
    // const suffix = await myKv.get('suffix')
    // responseText += suffix

    const session = await getSession();

    return NextResponse.json(session);
}