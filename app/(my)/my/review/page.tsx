'use client';

import styles from '../../../../styles/myreview.module.css';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPaginatedUserReviews, getReviewPageInfo, ReviewType } from '@/services/reviewService';
import { useInfiniteScroll } from '@/hooks';
import Review from '@/components/Review';
import { getTotalPages } from '@/shared/utils/detailUtil';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { flattenDeep, compact } from 'lodash';

const MyReviewList = () => {
    const router = useRouter();

    const { data: pageInfo } = useQuery({
        queryKey: ['reviewPagination'],
        queryFn: () => getReviewPageInfo(),
    });

    const totalPage = getTotalPages(pageInfo, DEFAULT_PAGE_SIZE);

    const {
        data: reviewList,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['paginatedReview'],
        queryFn: ({ pageParam }) => getPaginatedUserReviews(pageParam, DEFAULT_PAGE_SIZE),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPageParam < totalPage) {
                return lastPageParam + 1;
            }
        },
        select: (data) => {
            return data.pages.flatMap((page) => page);
            // return data.pages.flat();
        },
    });

    const { observerEl } = useInfiniteScroll({
        callbackFn: fetchNextPage,
        hasNextPage: hasNextPage,
    });

    console.log(reviewList);

    return (
        <div>
            <Button size="sm" role="none" onClick={() => router.back()}>
                뒤로가기
            </Button>

            <div className={styles.layout}>
                {reviewList && reviewList.length === 0 ? (
                    <div className={styles.nonReview}>
                        <Text typography="st3">작성한 리뷰가 없어요🥲</Text>
                    </div>
                ) : (
                    <Review reviewList={reviewList as ReviewType[]} />
                )}
            </div>
            <div ref={observerEl} />
        </div>
    );
};

export default MyReviewList;

// 'use client';

// import styles from '../../../../styles/myreview.module.css';
// import { useRouter } from 'next/navigation';
// import Button from '@/components/common/Button';
// import Text from '@/components/common/Text';
// import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
// import { getPaginatedUserReviews, getReviewPageInfo, ReviewType } from '@/services/reviewService';
// import { useInfiniteScroll } from '@/hooks';
// import Review from '@/components/Review';
// import { getTotalPages } from '@/shared/utils/detailUtil';
// import { DEFAULT_PAGE_SIZE } from '@/constants';

// const MyReviewList = () => {
//     const router = useRouter();

//     const { data: pageInfo } = useQuery({
//         queryKey: ['reviewPagination'],
//         queryFn: () => getReviewPageInfo(),
//     });

//     const totalPage = getTotalPages(pageInfo, DEFAULT_PAGE_SIZE);

//     const {
//         data: reviewList,
//         hasNextPage,
//         fetchNextPage,
//         isFetchingNextPage,
//     } = useInfiniteQuery({
//         queryKey: ['paginatedReview'],
//         queryFn: ({ pageParam }) => getPaginatedUserReviews(pageParam, DEFAULT_PAGE_SIZE),
//         initialPageParam: 1,
//         getNextPageParam: (lastPage, allPages, lastPageParam) => {
//             if (lastPageParam < totalPage) {
//                 return lastPageParam + 1;
//             }
//         },
//         select: (data) => {
//             return data.pages.flat();
//         },
//     });

//     const { observerEl } = useInfiniteScroll({
//         callbackFn: fetchNextPage,
//         hasNextPage: hasNextPage,
//     });

//     return (
//         <div>
//             <Button size="sm" role="none" onClick={() => router.back()}>
//                 뒤로가기
//             </Button>

//             <div className={styles.layout}>
//                 {reviewList && reviewList.length === 0 ? (
//                     <div className={styles.nonReview}>
//                         <Text typography="st3">작성한 리뷰가 없어요🥲</Text>
//                     </div>
//                 ) : (
//                     <Review reviewList={reviewList as ReviewType[]} />
//                 )}
//             </div>
//             <div ref={observerEl} />
//         </div>
//     );
// };

// export default MyReviewList;
