import { CompanionsType, FeedBackType } from '@/shared/types';

export const FEEDBACK_LIST: FeedBackType[] = [
    {
        type: 'positive',
        items: [
            { id: 1, label: '맛있어요', value: 'tasty', selected: false },
            { id: 2, label: '뷰가 좋아요', value: 'good_view', selected: false },
            { id: 3, label: '매장이 넓어요', value: 'spacious', selected: false },
            { id: 4, label: '주차가 편해요', value: 'easy_parking', selected: false },
            { id: 5, label: '친절해요', value: 'friendly', selected: false },
            { id: 6, label: '가성비가 좋아요', value: 'good_value', selected: false },
            { id: 7, label: '특별한 날 방문하기 좋아요', value: 'special_occasion', selected: false },
            { id: 8, label: '청결해요', value: 'clean', selected: false },
            { id: 9, label: '건강한 맛이에요', value: 'healthy', selected: false },
            { id: 10, label: '아이와 함께 오기 좋아요', value: 'kid_friendly', selected: false },
            { id: 11, label: '부모님 모시고 오기 좋아요', value: 'good_for_parents', selected: false },
            { id: 12, label: '반려동물과 함께 가능해요', value: 'pet_friendly', selected: false },
            { id: 13, label: '양이 많아요', value: 'large_portions', selected: false },
            { id: 14, label: '비싼 만큼 맛있어요', value: 'worth_the_price', selected: false },
            { id: 15, label: '단체모임 하기 좋아요', value: 'good_for_groups', selected: false },
            { id: 16, label: '혼밥하기 좋아요', value: 'good_for_solo', selected: false },
        ],
    },
    {
        type: 'negative',
        items: [
            { id: 17, label: '비싼 편이에요', value: 'expensive', selected: false },
            { id: 18, label: '음식이 늦게 나와요', value: 'slow_service', selected: false },
            { id: 19, label: '양이 적어요', value: 'small_portions', selected: false },
            { id: 20, label: '불친절해요', value: 'unfriendly', selected: false },
            { id: 21, label: '웨이팅이 길어요', value: 'long_wait', selected: false },
            { id: 22, label: '시끄러워요', value: 'noisy', selected: false },
            { id: 23, label: '메뉴가 적어요', value: 'limited_menu', selected: false },
            { id: 24, label: '매장이 협소해요', value: 'small_space', selected: false },
            { id: 25, label: '혼밥하기 힘들어요', value: 'hard_for_solo', selected: false },
            { id: 26, label: '주차 공간이 협소해요', value: 'limited_parking', selected: false },
            { id: 27, label: '찾아가기 어려워요', value: 'hard_to_find', selected: false },
        ],
    },
];

export const COMPANIONS: CompanionsType[] = [
    { key: 'parents', value: '부모님' },
    { key: 'lover', value: '애인' },
    { key: 'friends', value: '친구' },
    { key: 'alone', value: '혼자' },
    { key: 'pet', value: '반려동물' },
    { key: 'else', value: '기타' },
];
