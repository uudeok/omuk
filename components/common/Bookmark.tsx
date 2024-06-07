'use client';

import NonBookmark from '../../assets/nonBookmark.svg';
import FillBookmark from '../../assets/bookmark.svg';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { checkBookmark, updateBookmark } from '@/services/bookmarkService';
import { useContext } from 'react';
import { AuthContext } from '@/shared/context/AuthProvider';

const Bookmark = ({ res_id }: { res_id: string }) => {
    const queryClient = useQueryClient();
    const session = useContext(AuthContext);

    const { data: bookmark, error } = useQuery({
        queryKey: ['bookmark', res_id],
        queryFn: () => checkBookmark(res_id),
        enabled: !!session,
    });

    const mutation = useMutation({
        mutationFn: (bookmarkToggle: boolean) => updateBookmark(bookmarkToggle, res_id),
        onMutate: (bookmarkToggle: boolean) => {
            queryClient.setQueryData(['bookmark', res_id], bookmarkToggle);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookmark', res_id] });
        },
    });

    const handleBookmarkToggle = () => {
        mutation.mutate(!bookmark);
    };

    return (
        <div onClick={() => handleBookmarkToggle()}>
            {bookmark ? <FillBookmark width={17} /> : <NonBookmark width={17} />}
        </div>
    );
};

export default Bookmark;
