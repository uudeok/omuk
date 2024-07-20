'use client';

import Modal from '@/components/common/Modal';
import { useBoolean } from '@/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Text from '@/components/common/Text';
import dynamic from 'next/dynamic';

const AlertModal = dynamic(() => import('@/components/modal/AlertModal'));

// mobile 로 접속 시 앱 준비중 모달 안내

const HomePage = () => {
    const router = useRouter();
    const { value: isOpen, setTrue: openModal, setFalse: closeModal } = useBoolean();

    useEffect(() => {
        const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
        const mobileDevice = /Mobi|Android/i.test(userAgent);

        if (mobileDevice) {
            openModal();
        } else return;
    }, [openModal]);

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

export default HomePage;
