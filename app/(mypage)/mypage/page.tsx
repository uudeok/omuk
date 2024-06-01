'use client';

import { supabase } from '@/shared/lib/supabase';
import { useEffect } from 'react';

const MyPage = () => {
    const getTest = async () => {
        let { data: test, error } = await supabase.from('notice').select('*');
        console.log('test 실행');
        console.log(test);
    };

    useEffect(() => {
        getTest();
    }, []);

    return (
        <div>
            <div>mypage</div>
        </div>
    );
};

export default MyPage;
