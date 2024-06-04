import { FeedBackType } from '@/shared/types';

export const FEEDBACK_LIST: FeedBackType[] = [
    {
        type: 'positive',
        items: [
            { id: 1, label: '맛있어요', selected: false },
            { id: 2, label: '뷰가 좋아요', selected: false },
            { id: 3, label: '매장이 넓어요', selected: false },
            { id: 4, label: '주차가 편해요', selected: false },
            { id: 5, label: '친절해요', selected: false },
            { id: 6, label: '가성비가 좋아요', selected: false },
            { id: 7, label: '특별한 날 방문하기 좋아요', selected: false },
            { id: 8, label: '청결해요', selected: false },
            { id: 9, label: '건강한 맛이에요', selected: false },
            { id: 10, label: '아이와 함께 오기 좋아요', selected: false },
            { id: 11, label: '부모님 모시고 오기 좋아요', selected: false },
            { id: 12, label: '반려동물과 함께 가능해요', selected: false },
            { id: 13, label: '양이 많아요', selected: false },
            { id: 14, label: '비싼 만큼 맛있어요', selected: false },
            { id: 15, label: '단체모임 하기 좋아요', selected: false },
            { id: 16, label: '혼밥하기 좋아요', selected: false },
        ],
    },
    {
        type: 'negative',
        items: [
            { id: 17, label: '비싼 편이에요', selected: false },
            { id: 18, label: '음식이 늦게 나와요', selected: false },
            { id: 19, label: '양이 적어요', selected: false },
            { id: 20, label: '불친절해요', selected: false },
            { id: 21, label: '웨이팅이 길어요', selected: false },
            { id: 22, label: '시끄러워요', selected: false },
            { id: 23, label: '메뉴가 적어요', selected: false },
            { id: 24, label: '먀장이 협소해요', selected: false },
            { id: 25, label: '혼밥하기 힘들어요', selected: false },
            { id: 26, label: '주차 공간이 협소해요', selected: false },
            { id: 27, label: '찾아가기 어려워요', selected: false },
        ],
    },
];
