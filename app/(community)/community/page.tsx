import Community from '@/components/Community';
import { createClient } from '@/shared/lib/supabase/server-client';

export const getPagination = async () => {
    const supabase = createClient();

    const { data, error }: any = await supabase.from('review').select('*').explain({ format: 'json', analyze: true });

    if (error) {
        throw new Error(error.message);
    }
    const actualRows = data[0].Plan.Plans[0]['Actual Rows'];

    return actualRows;
};

export const getInitalReviewPage = async (pageParam: number, pageSize: number) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('review')
        .select('*')
        .order('created_at', { ascending: false })
        .range(pageParam, pageSize);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

const CommunityPage = async () => {
    const totalReviews = await getPagination();
    const initalReviews = await getInitalReviewPage(0, 14);

    return (
        <div>
            <Community totalReviews={totalReviews} initalReviews={initalReviews} />
        </div>
    );
};

export default CommunityPage;
