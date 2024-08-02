'use client';

import Icons from './Icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBookmark, deleteBookmark, postBookmark } from '@/services/bookmarkService';
import { useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext } from '@/shared/context/AuthProvider';

type BookmarkProps = {
    res_id: string;
    placeName: string;
    category: string;
    address: string | undefined;
};

const Bookmark = ({ res_id, placeName, category, address }: BookmarkProps) => {
    const queryClient = useQueryClient();
    const session = useContext(AuthContext);
    const [isBookmark, setIsBookmark] = useState<boolean>(false);

    const { data: bookmark } = useQuery({
        queryKey: ['bookmark', res_id],
        queryFn: () => getBookmark(res_id),
        enabled: !!session,
    });

    useEffect(() => {
        if (bookmark && bookmark.length > 0) {
            setIsBookmark(true);
        } else {
            setIsBookmark(false);
        }
    }, [bookmark]);

    const bookmarkToggle = useMutation({
        mutationFn: async () => {
            if (bookmark && bookmark.length > 0) {
                await deleteBookmark(res_id);
            } else {
                await postBookmark({
                    res_id: res_id,
                    category: category,
                    placeName: placeName,
                    address: address,
                });
            }
        },
        onMutate: () => {
            const prevBookmark = queryClient.getQueryData(['bookmark', res_id]);
            setIsBookmark((prev) => !prev);

            return { prevBookmark };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookmark', res_id] });
        },
        onError: (error, variables, context) => {
            if (context?.prevBookmark) {
                queryClient.setQueryData(['bookmark', res_id], context.prevBookmark);
                setIsBookmark((prev) => !prev);
            }
            alert('일시적 오류로 잠시 후 다시 시도해주세요.');
            console.error('즐겨찾기 실패', error);
        },
    });

    const handleBookmarkToggle = useCallback(() => {
        if (!session) return alert('로그인이 필요한 서비스 입니다.');

        bookmarkToggle.mutate();
    }, [session, bookmarkToggle]);

    return (
        <div onClick={handleBookmarkToggle}>
            {isBookmark ? <Icons.FillBookmark width={17} /> : <Icons.NonBookmark width={17} />}
        </div>
    );
};

export default Bookmark;
