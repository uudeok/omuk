'use client';

import styles from '../../../../styles/pages/mybookmark.module.css';
import Button from '@/components/common/Button';
import List, { ListBox } from '@/components/common/List';
import { useInfiniteScroll } from '@/hooks';
import { getBookmarkTotalRows, getUserBookmarksPaginated } from '@/services/bookmarkService';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Text from '@/components/common/Text';
import { getTotalPages } from '@/shared/utils/detailUtil';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import EmptyState from '@/components/common/EmptyState';

const MyBookmark = () => {
    const router = useRouter();

    const { data: bookmarkTotalRows } = useQuery({
        queryKey: ['bookmarkTotalRows'],
        queryFn: getBookmarkTotalRows,
    });

    const totalPage = getTotalPages(bookmarkTotalRows, DEFAULT_PAGE_SIZE);

    const {
        data: bookmarkList = [],
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['bookmarkList'],
        queryFn: ({ pageParam }) => getUserBookmarksPaginated(pageParam, DEFAULT_PAGE_SIZE),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPageParam < totalPage) {
                return lastPageParam + 1;
            }
        },
        select: (data) => {
            return data.pages.flatMap((page) => page);
        },
    });

    const { observerEl } = useInfiniteScroll({
        callbackFn: fetchNextPage,
        hasNextPage: hasNextPage,
    });

    return (
        <div>
            <Button size="sm" role="none" onClick={() => router.back()}>
                뒤로가기
            </Button>

            <div>
                <List>
                    {bookmarkList.length === 0 ? (
                        <EmptyState label="아직 즐겨찾기한 곳이 없어요" />
                    ) : (
                        bookmarkList.map((item: any) => (
                            <ListBox
                                key={item.id}
                                top={
                                    <div className={styles.top}>
                                        <Text typography="t4">{item.placeName}</Text>
                                        <Text typography="st3">{item.category}</Text>
                                        <Text typography="st3">{item.address}</Text>
                                    </div>
                                }
                                bottom={
                                    <div className={styles.bottom}>
                                        <Button size="sm" role="none" onClick={() => router.push(`/${item.res_id}`)}>
                                            보러가기 ▶︎
                                        </Button>
                                    </div>
                                }
                            />
                        ))
                    )}
                </List>
            </div>

            <div ref={observerEl} />
        </div>
    );
};

export default MyBookmark;
