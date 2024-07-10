'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/shared/lib/supabase/brower-client';

const CallbackPage = () => {
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const handleAuthCallback = async () => {
            const { data, error } = await supabase.auth.getSession();
            // const { error } = await supabase.auth.getSessionFromUrl({ storeSession: true });

            console.log('callback page', data);

            if (error) {
                console.error('Error retrieving auth session:', error);
            } else {
                // 인증이 완료되면 메인 페이지로 리디렉션
                router.push('/');
            }
        };

        handleAuthCallback();
    }, [router, supabase]);

    return <div>Loading...</div>;
};

export default CallbackPage;
