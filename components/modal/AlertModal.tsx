'use client';

import styles from '../../styles/ui/alertModal.module.css';
import Button from '../common/Button';
import Icons from '../common/Icons';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

type Props = {
    onClose: () => void;
    redirectPath?: string;
    top: ReactNode;
    middle?: ReactNode;
    bottom: ReactNode;
};

const AlertModal = ({ onClose, redirectPath, top, middle, bottom }: Props) => {
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
                <Icons.Caution width={35} />
            </div>
            <ul className={styles.content}>
                <li>
                    {top}
                    {middle}
                    {bottom}
                </li>
            </ul>
            <div>
                <Button size="lg" onClick={handleConfirm}>
                    확인
                </Button>
            </div>
        </div>
    );
};

export default AlertModal;
