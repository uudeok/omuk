'use client';

import { useCallback, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { createClient } from '@/shared/lib/supabase/brower-client';

export function useSession() {
    const supabase = createClient();
    const [session, setSession] = useState<Session | null>(null);

    // console.log('session', session);

    const getSession = useCallback(async () => {
        const {
            data: { session },
        } = await supabase.auth.getSession();

        setSession(session);
    }, [supabase.auth]);

    useEffect(() => {
        getSession();
    }, [getSession]);

    return session;
}
