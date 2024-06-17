'use client';

import NonBookmark from '../../assets/nonBookmark.svg';
import FillBookmark from '../../assets/bookmark.svg';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBookmark, deleteBookmark, postBookmark } from '@/services/bookmarkService';
import { useState } from 'react';
import { useSession } from '@/hooks';

type BookmarkProps = {
    res_id: string;
    placeName: string;
    category: string;
    address: string | undefined;
};

const Bookmark = ({ res_id, placeName, category, address }: BookmarkProps) => {
    const queryClient = useQueryClient();
    const session = useSession();
    const [debouncedClick, setDebouncedClick] = useState<boolean>(true);

    const { data: bookmark } = useQuery({
        queryKey: ['bookmark', res_id],
        queryFn: () => getBookmark(res_id),
        enabled: !!session,
    });

    const mutation = useMutation({
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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookmark', res_id] });
        },
    });

    const handleBookmarkToggle = () => {
        if (debouncedClick) {
            setDebouncedClick(false);
            mutation.mutate();
            setTimeout(() => setDebouncedClick(true), 1000);
        }
    };

    return (
        <div onClick={handleBookmarkToggle}>
            {bookmark && bookmark.length > 0 ? <FillBookmark width={17} /> : <NonBookmark width={17} />}
        </div>
    );
};

export default Bookmark;
