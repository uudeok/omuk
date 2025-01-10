import RestaurantDetail from '@/components/RestaurantDetail';
import { ParamType } from '@/shared/types';

export const getDetail = async (id: string) => {
    const response = await fetch(`https://place.map.kakao.com/m/main/v/${id}/`);

    if (!response.ok) {
        throw new Error('데이터 가져오기 실패');
    }
    return response.json();
};

const DetailPage = async ({ params: { id } }: ParamType) => {
    const resData = await getDetail(id);
    console.log(resData);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: resData?.basicInfo?.placenamefull,
        image: resData?.basicInfo?.mainphotourl,
        description: resData?.basicInfo?.category?.catename,
    };

    return (
        <>
            <section>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </section>
            <RestaurantDetail resData={resData} res_id={id} />
        </>
    );
};

export default DetailPage;
