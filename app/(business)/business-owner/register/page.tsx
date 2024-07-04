'use client';

import styles from '../../../../styles/verificationform.module.css';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import { useState } from 'react';
import Arrow from '../../../../assets/down-arrow.svg';
import { useRouter } from 'next/navigation';

const STEP = [
    { question: '음식점 (카페, 베이커리, 주점 등) 을 운영하시나요?' },
    { question: '사장님 이신가요 ? ' },
    { question: '사업자등록증을 가지고 계신가요 ? ' },
];

const RegisterPage = () => {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [visibleSteps, setVisibleSteps] = useState([0]);
    const [showArrow, setShowArrow] = useState(false);

    const handleNextStep = () => {
        if (step < STEP.length - 1) {
            setStep((prevStep) => prevStep + 1);
            setVisibleSteps((prevVisibleSteps) => [...prevVisibleSteps, step + 1]);
            setShowArrow(true); // Show arrow when moving to the next question
        }
    };
    return (
        <div>
            <Button size="sm" role="none" onClick={() => router.back()}>
                뒤로가기
            </Button>

            <div className={styles.layout}>
                {visibleSteps.map((visibleStep, index) => (
                    <div key={index} className={`${styles.question} ${styles.fadeIn}`}>
                        <Text typography="t5">{STEP[visibleStep].question}</Text>
                        <div className={styles.button}>
                            <Button size="sm" role="round" onClick={handleNextStep}>
                                YES
                            </Button>
                            <Button size="sm" role="round">
                                NO
                            </Button>
                        </div>
                        {index < visibleSteps.length - 1 && showArrow && <Arrow width={25} />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RegisterPage;
