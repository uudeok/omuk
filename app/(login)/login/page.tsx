'use client';

import styles from '../../../styles/login.module.css';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import { Provider } from '@supabase/supabase-js';
import { createClient } from '@/shared/lib/supabase/brower-client';
import { useRouter } from 'next/navigation';

const getURL = () => {
    let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // 프로덕션 환경에서 사이트 URL로 설정
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Vercel에 의해 자동으로 설정
        'http://localhost:3000/';
    // localhost가 아닐 때 `https://`를 포함해야 합니다.
    url = url.startsWith('http') ? url : `https://${url}`;
    // 끝에 `/`를 포함해야 합니다.
    url = url.endsWith('/') ? url : `${url}/`;
    return url;
};

const LoginPage = () => {
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (provider: Provider) => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: getURL(),
            },
        });

        if (error) {
            throw new Error(error.message);
        }
    };

    return (
        <div className={styles.login}>
            <div className={styles.title}>
                <Text typography="t2">로그인 하기</Text>
                <Text typography="st3">로그인이 필요한 서비스입니다.</Text>
                <Text typography="st3">소셜 로그인 및 이메일로 로그인 할 수 있습니다.</Text>
            </div>

            <div className={styles.loginBtn}>
                <Button size="lg" role="kakao" onClick={() => handleLogin('kakao')}>
                    카카오 로그인
                </Button>
                <Button size="lg" role="google" onClick={() => handleLogin('google')}>
                    구글로 로그인
                </Button>
            </div>

            <div className={styles.business}>
                <Button size="sm" role="none" onClick={() => router.push('/business-login')}>
                    사장님 로그인
                </Button>
            </div>
        </div>
    );
};

export default LoginPage;
