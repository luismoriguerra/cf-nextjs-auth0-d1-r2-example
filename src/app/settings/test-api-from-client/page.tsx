
'use client'
import useSWR from 'swr';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

const fetcher = async (uri: string) => {
    const response = await fetch(uri);
    return response.json();
};

// INFO: Private Client Page
export default withPageAuthRequired(function Products() {
    // INFO: private API 
    const { data, error } = useSWR('/api/v1/management/settings', fetcher) as any;
    if (error) return <div>oops... {error.message}</div>;
    if (data === undefined) return <div>Loading...</div>;
    return <div>
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
    </div>;
});