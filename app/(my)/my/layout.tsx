'use client';

import styles from '../../../styles/mypageLayout.module.css';
import Slide from '@/components/layout/Slide';
import { ReactNode } from 'react';
import Text from '@/components/common/Text';
import { useSession } from '@/hooks';
import Avatar from '@/components/common/\bAvatar';

const MypageLayout = ({ children }: { children: ReactNode }) => {
    const session = useSession();
    if (!session) return;

    const userInfo = session?.user.user_metadata;

    const profile = {
        avatar_url: userInfo?.avatar_url,
        email: userInfo?.email,
        username: userInfo?.name,
        id: session?.user.id,
    };
    return (
        <Slide styles={{ width: '352px', left: '352px' }}>
            <div className={styles.header}>
                <Avatar profile={profile} />
            </div>
            <main className={styles.content}>{children}</main>
        </Slide>
    );
};

export default MypageLayout;

// 'use client';

// import styles from '../../../styles/mypageLayout.module.css';
// import Slide from '@/components/layout/Slide';
// import { ReactNode } from 'react';
// import Text from '@/components/common/Text';
// import { useSession } from '@/hooks';

// const MypageLayout = ({ children }: { children: ReactNode }) => {
//     const session = useSession();
//     const userInfo = session?.user.user_metadata;
//     session?.user.id;

//     const profile = {
//         avatar_url: userInfo?.avatar_url,
//         email: userInfo?.email,
//         username: userInfo?.name,
//         id: session?.user.id,
//     };
//     return (
//         <Slide styles={{ width: '352px', left: '352px' }}>
//             <div className={styles.header}>
//                 <div className={styles.avatar}>
//                     <img src={userInfo?.avatar_url} width="50px" alt="img" />
//                     <Text typography="t2">{userInfo?.name}</Text>
//                 </div>
//             </div>
//             <main className={styles.content}>{children}</main>
//         </Slide>
//     );
// };

// export default MypageLayout;
