'use client';

import Modal from '@/components/common/Modal';
import { useBoolean, useDeviceType } from '@/hooks';
import Text from '@/components/common/Text';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const AlertModal = dynamic(() => import('@/components/modal/AlertModal'));

// 모바일 환경에서 앱 준비 중 모달을 표시하는 컴포넌트
const MobileAlertModal = () => {
    const isMobile = useDeviceType();
    const { value: isOpen, setTrue: openModal, setFalse: closeModal } = useBoolean();

    useEffect(() => {
        if (isMobile) {
            openModal();
        }
    }, [isMobile, openModal]);

    return (
        <Modal isOpen={isOpen} onClose={closeModal} showCloseButton={false}>
            <AlertModal
                onClose={closeModal}
                top={<Text typography="t1">🫢</Text>}
                middle={<Text typography="t5">앱 준비중</Text>}
                bottom={<Text typography="st3">아직 모바일 버전은 준비중이에요!</Text>}
            />
        </Modal>
    );
};

export default MobileAlertModal;
