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

4. Add Login and Logout links
```
<Button asChild>
  <Link href="/api/auth/login">Login</Link>
</Button>
<hr />
<div>
  <a href="/api/auth/logout">Logout</a>
</div>
```

5. Add UserClient component
```
'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function UserClient() {
    const { user } = useUser();
    if (user) {
        return <pre data-testid="client-component">{JSON.stringify(user, null, 2)}</pre>;
    }
    return <> anonymous</>;
}
```

6. for full private app
```
src/middleware.ts
import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
export default withMiddlewareAuthRequired();
```

7. Add secrets to wrangler
```
npx wrangler pages secret put AUTH0_SECRET
npx wrangler pages secret put AUTH0_BASE_URL
npx wrangler pages secret put AUTH0_ISSUER_BASE_URL
npx wrangler pages secret put AUTH0_CLIENT_ID
npx wrangler pages secret put AUTH0_CLIENT_SECRET
```