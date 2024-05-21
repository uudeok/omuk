import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export const getDetail = async (id: string) => {
    const response = await fetch(`https://place.map.kakao.com/m/main/v/${id}`);
    return response.json();
};

const DetailPage = async ({ params: { id } }: Params) => {
    const restaurantData = await getDetail(id);
    console.log(restaurantData);

    return (
        <div>
            <div>id : {id}</div>
            <div>1234</div>
        </div>
    );
};

export default DetailPage;
