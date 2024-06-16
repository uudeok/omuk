'use client';

import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/shared/lib/supabase';

export function useSession() {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            setSession(session);
        };

        getSession();
    }, []);

    return session;
}

// 'use client';

// import { useEffect, useState } from 'react';
// import { createSupabaseBrowserClient } from '@/shared/lib/supabase/browser-client';
// import { Session } from '@supabase/supabase-js';
// import { supabase } from '@/shared/lib/supabase/supabase';

// export default function useSession() {
//     const [session, setSession] = useState<Session | null>(null);

//     useEffect(() => {
//         const getSession = async () => {
//             const {
//                 data: { session },
//             } = await supabase.auth.getSession();

//             setSession(session);
//         };

//         getSession();
//     }, []);

//     return session;
// }
