import { createClient } from '../lib/supabase/brower-client';

export const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
};

export const getURL = () => {
    let url =
        process.env.NEXT_PUBLIC_SITE_URL ?? // 프로덕션 환경에서 사이트 URL로 설정
        process.env.NEXT_PUBLIC_VERCEL_URL ?? // Vercel에 의해 자동으로 설정
        'http://localhost:3000/';
    // localhost가 아닐 때 `https://`를 포함
    url = url.startsWith('http') ? url : `https://${url}`;
    // 끝에 `/`를 포함해야함
    url = url.endsWith('/') ? url : `${url}/`;
    return url;
};
