'use client';

import styles from '../../styles/signup.module.css';
import { useInput } from '@/hooks';
import Button from '../common/Button';
import Input from '../common/Input';
import InputBase from '../common/InputBase';
import { signupHandler } from '@/services/loginService';

const SignUpForm = () => {
    const [emailValue, onChangeEmail, isEmailValid, setEmailValue] = useInput({
        type: 'string',
        minLength: 5,
    });

    const [passwordValue, onChangePassword, isPasswordValid, setPasswordValue] = useInput({
        type: 'string',
        minLength: 7,
    });

    const [nickNameValue, onChangeNickname, isNicknameValid, setNicknameValue] = useInput({
        type: 'string',
        minLength: 2,
    });

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 로직 비활성화
        return;
        await signupHandler(emailValue, passwordValue, nickNameValue, 'owner');
        window.location.href = '/business-owner';
    };

    return (
        <form className={styles.signup} onSubmit={handleSignup}>
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

            <Input label="닉네임" bottomText={isNicknameValid ? '' : '닉네임은 2자리 이상입니다'}>
                <InputBase placeholder="닉네임을 지어주세요" value={nickNameValue} onChange={onChangeNickname} />
            </Input>

            <Button size="lg" disabled={true}>
                회원가입
            </Button>
        </form>
    );
};

export default SignUpForm;
