'use client';

import { useEffect, useState } from 'react';

export const usePagination = (pagination: any, pageSize: number) => {
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        if (Array.isArray(pagination)) {
            const plan = pagination[0].Plan as any;
            const totalRows = plan.Plans[0]['Actual Rows'];
            const totalPage = Math.ceil(totalRows / pageSize);

            setTotalPage(totalPage);
        }
    }, [pageSize, pagination]);

    return { totalPage };
};

// export const usePagination = (pagination: any) => {
//     const [page, setPage] = useState(0);
//     const [hasNextPage, setHasNextPage] = useState<boolean>(false);

//     useEffect(() => {
//         if (Array.isArray(pagination)) {
//             const plan = pagination[0].Plan as any;
//             const totalRows = plan.Plans[0]['Actual Rows'];
//             const hasNextPage = page < totalRows - page;

//             setHasNextPage(hasNextPage);
//         }
//     }, [page, pagination]);

//     return { page, hasNextPage, setPage };
// };
