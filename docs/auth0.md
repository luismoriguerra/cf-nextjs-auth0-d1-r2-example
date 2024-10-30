https://github.com/auth0/nextjs-auth0?tab=readme-ov-file#app-router

1. Install 
```
npm install @auth0/nextjs-auth0
```

2. Create auth0 route
```
src/app/api/auth/[auth0]/route.ts
```

3. Wrap your app/layout.js component with the UserProvider component:
```
import { UserProvider } from '@auth0/nextjs-auth0';

export default function RootLayout({ children }) {
  return <UserProvider>{children}</UserProvider>;
}
```

4. Add secrets to wrangler
```
npx wrangler pages secret put AUTH0_SECRET
npx wrangler pages secret put AUTH0_BASE_URL
npx wrangler pages secret put AUTH0_ISSUER_BASE_URL
npx wrangler pages secret put AUTH0_CLIENT_ID
npx wrangler pages secret put AUTH0_CLIENT_SECRET
```