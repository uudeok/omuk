import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Detail from '@/components/Detail';

export const getDetail = async (id: string) => {
    const response = await fetch(`https://place.map.kakao.com/m/main/v/${id}/`);

    if (!response.ok) {
        throw new Error('데이터 가져오기 실패');
    }
    return response.json();
};

const DetailPage = async ({ params: { id } }: Params) => {
    const resData = await getDetail(id);

    return <Detail resData={resData} res_id={id} />;
};

export default DetailPage;
