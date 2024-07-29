import RestaurantDetail from '@/components/RestaurantDetail';
import { ParamType } from '@/shared/types';

export const getDetail = async (id: string) => {
    console.log('refetch ???');
    const response = await fetch(`https://place.map.kakao.com/m/main/v/${id}/`, {
        next: {
            revalidate: 3600,
        },
    });

    if (!response.ok) {
        throw new Error('데이터 가져오기 실패');
    }
    return response.json();
};

// export const getDetail = async (id: string) => {
//     const response = await fetch(`https://place.map.kakao.com/m/main/v/${id}/`);

//     if (!response.ok) {
//         throw new Error('데이터 가져오기 실패');
//     }
//     return response.json();
// };

const DetailPage = async ({ params: { id } }: ParamType) => {
    const resData = await getDetail(id);

    return <RestaurantDetail resData={resData} res_id={id} />;
};

export default DetailPage;
