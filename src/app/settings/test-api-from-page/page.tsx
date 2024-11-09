import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0/edge';

export const runtime = 'edge';

export default async function TestApi() {

    const { user } = await getSession() || {};
    return <div>
        <pre>
            {JSON.stringify(user, null, 2)}
        </pre>
    </div>;
}