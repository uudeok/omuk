import { BasicInfoType } from '@/shared/types/data';
import { supabase } from '../lib/supabase';

type AddressType = BasicInfoType['basicInfo']['address'];
type FeedbackType = BasicInfoType['basicInfo']['feedback'];

export const makeAdress = (address: AddressType) => {
    if (!address) return;
    const { region, newaddr, addrdetail } = address;

    const fullname = region?.fullname;
    const newaddrfull = newaddr?.newaddrfull;
    let detail = addrdetail;

    if (detail === undefined) {
        detail = '';
    }

    return ` ${fullname} ${newaddrfull} ${detail}`;
};

export const calculateScore = (feedback: FeedbackType) => {
    // if (!feedback) return;
    if (feedback.scorecnt === 0) return 0;
    const score = feedback.scoresum / feedback.scorecnt;
    return score.toFixed(1);
};

export const checkReview = async (user_id: string, res_id: string) => {
    const { data: review, error } = await supabase
        .from('review')
        .select('*')
        .eq('user_id', user_id)
        .eq('res_id', res_id)
        .single();

    console.log(review);

    if (error) {
        throw new Error(error.message);
    }
};
