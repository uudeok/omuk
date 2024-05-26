import { BasicInfoType } from '@/shared/types/data';

type AddressType = BasicInfoType['basicInfo']['address'];
type FeedbackType = BasicInfoType['basicInfo']['feedback'];

export const makeAdress = (address: AddressType) => {
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
    if (feedback.scorecnt === 0) return 0;
    const score = feedback.scoresum / feedback.scorecnt;
    return score.toFixed(1);
};