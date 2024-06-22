import styles from '../../../styles/mypageLayout.module.css';
import Slide from '@/components/layout/Slide';
import { ReactNode } from 'react';
import Avatar from '@/components/common/Avatar';
import { createClient } from '@/shared/lib/supabase/server-client';
import { FollowStatusType } from '@/services/followService';
import Alarm from '@/components/Bell';

// ssr 버전 '팔로우 요청한' 데이터 가져오기
export const getFollowListByStatus = async (status: FollowStatusType) => {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user) return;

    const user_id = data.user.id;

    const { data: followList, error } = await supabase
        .from('follow')
        .select('*')
        .eq('requestee_id', user_id)
        .eq('status', status);

    if (error) {
        throw new Error(error.message);
    }

    return followList;
};

const MypageLayout = async ({ children }: { children: ReactNode }) => {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const hasFollower = await getFollowListByStatus('pending');

    const profile = {
        avatar_url: data.user?.user_metadata.avatar_url,
        email: data.user?.email,
        username: data.user?.user_metadata.name,
        id: data.user?.id,
    };

    return (
        <Slide styles={{ width: '352px', left: '352px' }}>
            <div className={styles.header}>
                <Avatar profile={profile} />
                <Alarm hasFollower={hasFollower} />
            </div>

            <main className={styles.content}>{children}</main>
        </Slide>
    );
};

export default MypageLayout;
