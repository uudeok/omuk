import RestaurantDetail from '@/components/RestaurantDetail';

const getDetail = async (id: string) => {
    const response = await fetch(`https://place.map.kakao.com/m/main/v/${id}/`);

    if (!response.ok) {
        throw new Error('데이터 가져오기 실패');
    }
    return response.json();
};

const DetailPage = async ({ params: { id } }: { params: { id: string } }) => {
    const resData = await getDetail(id);

    return <RestaurantDetail resData={resData} res_id={id} />;
};

export default DetailPage;
