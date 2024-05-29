import { getDetail } from '@/app/(detail)/[id]/page';
import Contents from './Contents';

const Detail = async ({ id }: { id: string }) => {
    const restaurantData = await getDetail(id);
    const { basicInfo, menuInfo } = restaurantData;

    return (
        <>
            <Contents basicInfo={basicInfo} menuInfo={menuInfo} />
            <div>test</div>
        </>
    );
};

export default Detail;
