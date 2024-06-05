'use client';

import { useUserInfo } from '@/hooks';

const MyPage = () => {
    const { userInfo } = useUserInfo();
    console.log('abc', userInfo);

    return (
        <div>
            <div>mypage</div>
            <button> 등록하기 </button>
        </div>
    );
};

export default MyPage;
