'use client';

import styles from '../../styles/business/signup.module.css';
import Input from '../common/Input';
import InputBase from '../common/InputBase';
import Button from '../common/Button';
import { useInput } from '@/hooks';
import { signinHandler } from '@/services/loginService';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const router = useRouter();

    const [emailValue, onChangeEmail, isEmailValid, setEmailValue] = useInput({
        type: 'string',
        minLength: 5,
    });

    const [passwordValue, onChangePassword, isPasswordValid, setPasswordValue] = useInput({
        type: 'string',
        minLength: 7,
    });

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 로직 비활성화
        return;
        const result = await signinHandler(emailValue, passwordValue);
        window.location.href = '/business-owner';
    };

    return (
        <form className={styles.signup} onSubmit={handleLogin}>
            <Input label="이메일">
                <InputBase
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    value={emailValue}
                    onChange={onChangeEmail}
                />
            </Input>

            <Input label="비밀번호" bottomText={isPasswordValid ? '' : '비밀번호는 7자리 이상입니다'}>
                <InputBase
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    value={passwordValue}
                    onChange={onChangePassword}
                />
            </Input>

            <Button size="lg" disabled={true}>
                로그인
            </Button>
        </form>
    );
};

export default LoginForm;
