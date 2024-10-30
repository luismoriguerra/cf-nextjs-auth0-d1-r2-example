

1. Create d1
```
npx wrangler d1 create cf-nextjs-auth0
```

2. Update wrangler.toml
```
[[d1_databases]]
binding = "DB"
database_name = "cf-nextjs-auth0"
database_id = "<id>"
```

3. Create first migration
```
npx wrangler d1 migrations create cf-nextjs-auth0 create_user_table
```

4. Apply migration locally
```
npx wrangler d1 migrations apply cf-nextjs-auth0 --local
```

5. Apply migration to production
```
npx wrangler d1 migrations apply cf-nextjs-auth0 --remote
```
