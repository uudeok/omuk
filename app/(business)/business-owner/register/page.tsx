'use client';

import styles from '../../../../styles/register.module.css';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import { useState } from 'react';
import Arrow from '../../../../assets/down-arrow.svg';
import { useRouter } from 'next/navigation';

const STEP = [
    { question: '음식점 (카페, 베이커리, 주점 등) 을 운영하시나요?', answer: '사장님 전용 공간이에요' },
    { question: '사장님 이신가요 ? ', answer: '가게 사장님만 등록이 가능해요' },
    { question: '사업자등록증을 가지고 계신가요 ? ', answer: '사업자 등록 된 가게만 등록이 가능합니다' },
    { question: '등록하러가기' },
];

const RegisterPage = () => {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [answer, setAnswer] = useState(false);

    const handleNextStep = () => {
        if (step < STEP.length - 1) {
            setStep((prev) => prev + 1);
        } else {
            router.push('/');
        }
    };

    return (
        <div>
            <Button size="sm" role="none" onClick={() => router.back()}>
                뒤로가기
            </Button>

            <div className={styles.layout}>
                <Text typography="t5">{STEP[step].question}</Text>
                <div className={styles.button}>
                    <Button size="sm" role="round" onClick={handleNextStep} disabled={answer}>
                        YES
                    </Button>
                    <Button size="sm" role="round" onClick={() => setAnswer(true)}>
                        NO
                    </Button>
                </div>
                {answer && (
                    <div className={styles.answer}>
                        <Text typography="t5">{STEP[step].answer}</Text>
                        <Button size="sm" role="round" onClick={() => router.back()}>
                            돌아가기
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
export default RegisterPage;

// 'use client';

// import styles from '../../../../styles/register.module.css';
// import Button from '@/components/common/Button';
// import Text from '@/components/common/Text';
// import { useState } from 'react';
// import Arrow from '../../../../assets/down-arrow.svg';
// import { useRouter } from 'next/navigation';

// const STEP = [
//     { question: '음식점 (카페, 베이커리, 주점 등) 을 운영하시나요?', answer: '사장님 전용 공간이에요' },
//     { question: '사장님 이신가요 ? ', answer: '가게 사장님만 등록이 가능해요' },
//     { question: '사업자등록증을 가지고 계신가요 ? ', answer: '사업자 등록 된 가게만 등록이 가능합니다' },
// ];

// const RegisterPage = () => {
//     const router = useRouter();
//     const [step, setStep] = useState(0);
//     const [visibleSteps, setVisibleSteps] = useState([0]);
//     const [showArrow, setShowArrow] = useState(false);
//     const [answers, setAnswers] = useState<{ [key: number]: string }>({});

//     const handleNextStep = () => {
//         if (step < STEP.length - 1) {
//             setStep((prevStep) => prevStep + 1);
//             setVisibleSteps((prevVisibleSteps) => [...prevVisibleSteps, step + 1]);
//             setShowArrow(true);
//         }
//     };

//     const handleNoClick = (index: number) => {
//         setAnswers((prevAnswers) => ({
//             ...prevAnswers,
//             [index]: STEP[index].answer,
//         }));
//     };

//     return (
//         <div>
//             <Button size="sm" role="none" onClick={() => router.back()}>
//                 뒤로가기
//             </Button>

//             <div className={styles.layout}>
//                 {visibleSteps.map((visibleStep, index) => (
//                     <div key={index} className={`${styles.question} ${styles.fadeIn}`}>
//                         <Text typography="t5">{STEP[visibleStep].question}</Text>
//                         <div className={styles.button}>
//                             <Button size="sm" role="round" onClick={handleNextStep}>
//                                 YES
//                             </Button>
//                             <Button size="sm" role="round" onClick={() => handleNoClick(visibleStep)}>
//                                 NO
//                             </Button>
//                         </div>
//                         {answers[visibleStep] && (
//                             <div className={styles.answer}>
//                                 <Text typography="t5">{answers[visibleStep]}</Text>
//                                 <Button size="sm" role="round">
//                                     돌아가기
//                                 </Button>
//                             </div>
//                         )}
//                         {index < visibleSteps.length - 1 && showArrow && <Arrow width={25} />}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
// export default RegisterPage;
