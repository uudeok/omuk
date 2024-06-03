'use client';

import { supabase } from '@/shared/lib/supabase';
import { useEffect } from 'react';

const MyPage = () => {
    const getData = async () => {
        const res = await supabase.from('notice').select('*');
        console.log(res.data);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div>mypage</div>
        </div>
    );
};

export default MyPage;
