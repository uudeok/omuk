import { BasicInfoType } from '@/types/data';

type AddressType = BasicInfoType['basicInfo']['address'];
type FeedbackType = BasicInfoType['basicInfo']['feedback'];

export const makeAdress = (address: AddressType) => {
    const newaddfullname = address.region.newaddrfullname;
    const fullname = address.region.fullname;
    const newaddrfull = address.newaddr.newaddrfull;
    const detail = address.addrdetail;

    return `${newaddfullname} ${fullname} ${newaddrfull} ${detail}`;
};

export const calculateScore = (feedback: FeedbackType) => {
    if (feedback.scorecnt === 0) return 0;
    const score = feedback.scoresum / feedback.scorecnt;
    return score.toFixed(1);
};
