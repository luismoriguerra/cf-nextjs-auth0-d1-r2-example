'use client';

import React, { useState, useEffect } from 'react';

export default function ProfileApi() {
    const [user, setUser] = useState();

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/v1/management/settings`);
            setUser(await res.json());
        })();
    }, []);

    return (
        <main>
            <h1>Profile (fetched from API)</h1>
            <h3>User</h3>
            <pre data-testid="profile-api">{JSON.stringify(user, null, 2)}</pre>
        </main>
    );
}