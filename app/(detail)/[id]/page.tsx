import { Suspense } from 'react';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Detail from '@/components/Detail';

export const getDetail = async (id: string) => {
    const response = await fetch(`https://place.map.kakao.com/m/main/v/${id}`);
    return response.json();
};

const DetailPage = async ({ params: { id } }: Params) => {
    return (
        <>
            <Suspense fallback={<h1>Loading...</h1>}>
                <Detail id={id} />
            </Suspense>
        </>
    );
};

export default DetailPage;
