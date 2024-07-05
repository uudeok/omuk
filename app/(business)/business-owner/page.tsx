'use client';

import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

const BusinessOwnerPage = () => {
    const router = useRouter();

    // role !== owner 이면 접근 불가 로직 작성

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <Button size="sm" onClick={() => router.push('/business-owner/register')}>
                    가게 등록하기
                </Button>
                <Button size="sm">관리하기</Button>
            </div>
        </div>
    );
};

export default BusinessOwnerPage;
