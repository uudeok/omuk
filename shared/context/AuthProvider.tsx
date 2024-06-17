'use client';

import { ReactNode, createContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { createClient } from '../lib/supabase/brower-client';

export const AuthContext = createContext<Session | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const supabase = createClient();
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                setSession(null);
            } else if (session) {
                setSession(session);
            }
        });

        return () => {
            sub.subscription.unsubscribe();
        };
    }, [supabase.auth]);
    return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
