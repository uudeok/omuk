'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getBookmarkList } from '@/services/bookmarkService';
import Button from '@/components/common/Button';

const MyBookmark = () => {
    const router = useRouter();

    const { data: bookmarkList } = useQuery({
        queryKey: ['bookmarkList'],
        queryFn: () => getBookmarkList(),
    });

    console.log(bookmarkList);

    return (
        <div>
            <Button size="sm" role="none" onClick={() => router.back()}>
                뒤로가기
            </Button>
            <div>bookmark list</div>
        </div>
    );
};

export default MyBookmark;
