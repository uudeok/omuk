'use client';

import NonBookmark from '../../assets/nonBookmark.svg';
import FillBookmark from '../../assets/bookmark.svg';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBookmark, deleteBookmark, postBookmark } from '@/services/bookmarkService';
import { useContext } from 'react';
import { AuthContext } from '@/shared/context/AuthProvider';

const Bookmark = ({ res_id }: { res_id: string }) => {
    const queryClient = useQueryClient();
    const session = useContext(AuthContext);

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
                await postBookmark(res_id);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookmark', res_id] });
        },
    });

    const handleBookmarkToggle = () => {
        mutation.mutate();
    };

    return (
        <div onClick={handleBookmarkToggle}>
            {bookmark && bookmark.length > 0 ? <FillBookmark width={17} /> : <NonBookmark width={17} />}
        </div>
    );
};

export default Bookmark;
