import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired();

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api/health (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      {
        source:
          '/((?!api/health|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
        missing: [
          { type: 'header', key: 'next-router-prefetch' },
          { type: 'header', key: 'purpose', value: 'prefetch' },
        ],
      },
   
    //   {
    //     source:
    //       '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    //     has: [
    //       { type: 'header', key: 'next-router-prefetch' },
    //       { type: 'header', key: 'purpose', value: 'prefetch' },
    //     ],
    //   },
   
    //   {
    //     source:
    //       '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    //     has: [{ type: 'header', key: 'x-present' }],
    //     missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
    //   },
    ],
  }