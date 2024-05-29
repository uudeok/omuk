import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { getDetail } from '../page';

const Review = async ({ params: { id } }: { params: Params }) => {
    const restaurantData = await getDetail(id);
    const { basicInfo, menuInfo } = restaurantData;

    return (
        <div>
            <div>review</div>
        </div>
    );
};

export default Review;
