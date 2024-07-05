'use client';

import LoginForm from '@/components/business/loginForm';
import styles from '../../../styles/businessLogin.module.css';
import Text from '@/components/common/Text';
import { useState } from 'react';
import SignUpForm from '@/components/business/SignUpForm';
import Button from '@/components/common/Button';

const TAB = [
    { key: '로그인', content: <LoginForm /> },
    { key: '회원가입', content: <SignUpForm /> },
];

const BusinessLogin = () => {
    const [tabNum, setTabNum] = useState<number>(0);

    return (
        <div className={styles.login}>
            <div className={styles.title}>
                <Text typography="t2">사장님 로그인</Text>
                <Text typography="st3">자영업자 사장님을 위한 로그인 공간입니다.</Text>
                <Text typography="st3">본인의 가게를 자유롭게 홍보해보세요.</Text>
            </div>

            <div>
                <div className={styles.tab}>
                    {TAB.map((tab, idx) => (
                        <Button
                            size="sm"
                            role="none"
                            key={tab.key}
                            className={tabNum === idx ? styles.activeButton : ''}
                            onClick={() => setTabNum(idx)}
                        >
                            {tab.key}
                        </Button>
                    ))}
                </div>

                <div className={styles.content}>{TAB[tabNum].content}</div>
            </div>
        </div>
    );
};

export default BusinessLogin;
