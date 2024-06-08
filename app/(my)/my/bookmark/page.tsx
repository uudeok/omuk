'use client';

import { useRouter } from 'next/navigation';

const MyBookmark = () => {
    const router = useRouter();

    return (
        <div>
            <div onClick={() => router.back()}>뒤로가기</div>
            <div>bookmark list</div>
        </div>
    );
};

export default MyBookmark;
