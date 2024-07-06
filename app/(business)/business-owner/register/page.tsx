'use client';

import styles from '../../../../styles/register.module.css';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import { useState, useRef } from 'react';
import Arrow from '../../../../assets/down-arrow.svg';
import { useRouter } from 'next/navigation';
import Input from '@/components/common/Input';
import InputBase from '@/components/common/InputBase';
import { useS3FileUpload } from '@/hooks';

const STEP = [
    { question: '음식점 (카페, 베이커리, 주점 등) 을 운영하시나요?', answer: '사장님 전용 공간이에요' },
    { question: '사장님 이신가요 ? ', answer: '사장님만 등록이 가능해요' },
    { question: '사업자등록증을 가지고 계신가요 ? ', answer: '등록 된 가게만 가능합니다' },
    { question: '등록하기' },
];

const RegisterPage = () => {
    const router = useRouter();
    const fileRef = useRef<HTMLInputElement>(null);

    const [step, setStep] = useState(0);
    const [visibleSteps, setVisibleSteps] = useState([0]);
    const [answer, setAnswer] = useState(false);
    const [showArrow, setShowArrow] = useState(false);
    const [showInput, setShowInput] = useState(false);

    const { setFiles, files, handleFileInputChange, uploadFiles, alertMessage, convertToFile } = useS3FileUpload({
        maxSize: 1,
    });

    const handleNextStep = () => {
        if (step < STEP.length - 1) {
            setShowArrow(true);
            setStep((prev) => prev + 1);
            setVisibleSteps((prevVisibleSteps) => [...prevVisibleSteps, step + 1]);
        } else {
            setShowInput(true);
        }
    };

    const submitRegister = () => {
        console.log('click');
    };

    return (
        <div>
            <Button size="sm" role="none" onClick={() => router.back()}>
                뒤로가기
            </Button>

            <div className={styles.layout}>
                {visibleSteps.map((visible, idx) => (
                    <div key={idx} className={`${styles.question} ${styles.fadeIn}`}>
                        <Text typography="t5">{STEP[visible].question}</Text>
                        <div className={styles.button}>
                            <Button
                                size="sm"
                                role="round"
                                onClick={handleNextStep}
                                disabled={answer || visibleSteps.includes(idx + 1)}
                            >
                                YES
                            </Button>
                            <Button
                                size="sm"
                                role="round"
                                onClick={() => setAnswer(true)}
                                disabled={answer || visibleSteps.includes(idx + 1)}
                            >
                                NO
                            </Button>
                        </div>
                        {idx < visibleSteps.length - 1 && showArrow && <Arrow width={25} />}
                    </div>
                ))}
                {answer && (
                    <div className={styles.answer}>
                        <Text typography="t5">{STEP[step].answer}</Text>
                        <Button size="sm" role="round" onClick={() => router.back()}>
                            돌아가기
                        </Button>
                    </div>
                )}
            </div>

            {showInput && (
                <div className={styles.addImg}>
                    <Text typography="t5">사업자 등록증 첨부</Text>
                    <div className={styles.businessCard}>
                        <div className={styles.preview} onClick={() => fileRef?.current?.click()}>
                            {files?.map((file, idx) => (
                                <img
                                    key={idx}
                                    src={URL.createObjectURL(file)}
                                    width="100%"
                                    height="160px"
                                    alt={`image${idx}`}
                                />
                            ))}
                        </div>

                        <div className={styles.sample}>
                            <img
                                src={'https://s3-omuk-images.s3.ap-northeast-2.amazonaws.com/sample.gif'}
                                alt="sample"
                                width="150px"
                                height="160px"
                            />
                            <Text typography="st3">예시</Text>
                        </div>
                    </div>

                    <Button size="lg" role="round" disabled={!files.length} onClick={submitRegister}>
                        등록하기
                    </Button>

                    <Input>
                        <InputBase
                            ref={fileRef}
                            className={styles.hidden}
                            type="file"
                            accept="image/*"
                            onChange={handleFileInputChange}
                        />
                    </Input>
                </div>
            )}
        </div>
    );
};
export default RegisterPage;
