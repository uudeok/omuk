'use client';

import { useEffect, useState } from 'react';

export const usePagination = (pagination: any, pageSize: number) => {
    const [totalPage, setTotalPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);

    useEffect(() => {
        if (Array.isArray(pagination)) {
            const plan = pagination[0].Plan as any;
            const totalRows = plan.Plans[0]['Actual Rows'];
            const totalPage = Math.ceil(totalRows / pageSize);

            setTotalRows(totalRows);
            setTotalPage(totalPage);
        }
    }, [pageSize, pagination]);

    return { totalPage, totalRows };
};
