'use client';

import { useUserInfo } from '@/hooks';
import { supabase } from '@/shared/lib/supabase';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const MyPage = () => {
    const { userInfo } = useUserInfo();

    const getData = async () => {
        const { data, error } = await supabase
            .from('review')
            .insert([
                {
                    rate: 5,
                    comment: '맛있어요',
                    positive: ['healthy', 'good_for_solo', 'easy_parking'],
                    negative: ['long_wait', 'hard_to_find'],
                    res_id: '1385924228',
                },
            ])
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    };

    const handleSubmit = () => {
        getData();
    };

    return (
        <div>
            <div>mypage</div>
            <button onClick={handleSubmit}> 등록하기 </button>
        </div>
    );
};

export default MyPage;
