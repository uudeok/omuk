import RestaurantDetail from '@/components/RestaurantDetail';
import { ParamType } from '@/shared/types';

const getDetail = async (id: string) => {
    console.time('getDetail');
    const response = await fetch(`https://place.map.kakao.com/m/main/v/${id}/`);

    if (!response.ok) {
        throw new Error('데이터 가져오기 실패');
    }

    console.timeEnd('getDetail');
    return response.json();
};

const DetailPage = async ({ params: { id } }: ParamType) => {
    const resData = await getDetail(id);

    return <RestaurantDetail resData={resData} res_id={id} />;
};

export default DetailPage;
