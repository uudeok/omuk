'use client';

import styles from '../../../styles/login.module.css';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import { supabase } from '@/shared/lib/supabase';
import Google from '../../../assets/google.svg';

const LoginPage = () => {
    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'kakao',
        });
        if (error) {
            console.log('kakao login error :', error);
        }
    };

    const checkLogin = async () => {
        const authInfo = await supabase.auth.getSession();

        console.log(authInfo);
    };

    return (
        <div className={styles.login}>
            <div className={styles.title}>
                <Text typography="t2">로그인 하기</Text>
                <Text typography="st3">로그인이 필요한 서비스입니다.</Text>
                <Text typography="st3">소셜 로그인 및 이메일로 로그인 할 수 있습니다.</Text>
            </div>

            <div className={styles.loginBtn}>
                <Button size="lg" role="kakao" onClick={handleLogin}>
                    카카오 로그인
                </Button>
                <Button size="lg" role="google" onClick={checkLogin}>
                    구글로 로그인
                </Button>
            </div>
        </div>
    );
};

export default LoginPage;
