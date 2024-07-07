'use client';

import styles from '../../styles/errorModal.module.css';
import Button from '../common/Button';
import Caution from '../../assets/caution.svg';
import Text from '../common/Text';
import { useRouter } from 'next/navigation';

type Props = {
    onClose: () => void;
    redirectPath?: string;
};

const ErrorModal = ({ onClose, redirectPath }: Props) => {
    const router = useRouter();

    const handleConfirm = () => {
        if (redirectPath) {
            onClose();
            router.replace(`/${redirectPath}`);
        } else {
            onClose();
        }
    };

    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <Caution width={35} />
            </div>
            <div className={styles.content}>
                <Text typography="t5">오류가 발생했습니다</Text>
                <Text typography="t5">잠시 후 다시 시도해주세요</Text>
            </div>
            <div>
                <Button size="lg" onClick={handleConfirm}>
                    확인
                </Button>
            </div>
        </div>
    );
};

export default ErrorModal;
