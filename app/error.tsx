'use client';

import styles from '../styles/pages/errorPage.module.css';
import Slide from '@/components/layout/Slide';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import { sendSlackNotification } from '@/shared/lib/slack/slackNotifier';

const ErrorPage = ({ error, reset }: any) => {
    console.log('errorPage error 입니다 : ', error);

    if (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        sendSlackNotification(errorMessage);
    }

    return (
        <Slide styles={{ width: '352px', left: '352px' }}>
            <div className={styles.error}>
                <Text typography="t5">데이터를 불러오는데 실패했습니다</Text>
                <Text typography="t5">혹은 잘못된 접근입니다.</Text>
                <Button size="sm" role="round" onClick={() => reset()}>
                    다시 시도하기
                </Button>
                <Button size="sm" role="round" onClick={() => (window.location.href = '/')}>
                    홈으로
                </Button>
            </div>
        </Slide>
    );
};

export default ErrorPage;

// 'use client';

// import styles from '../styles/pages/errorPage.module.css';
// import Slide from '@/components/layout/Slide';
// import Button from '@/components/common/Button';
// import Text from '@/components/common/Text';
// import { sendSlackNotification } from '@/shared/lib/slack/slackNotifier';

// const ErrorPage = ({ error, reset }: any) => {
//     console.log('errorPage error 입니다 : ', error);

//     if (error) {
//         sendSlackNotification(error);
//     }

//     return (
//         <Slide styles={{ width: '352px', left: '352px' }}>
//             <div className={styles.error}>
//                 <Text typography="t5">데이터를 불러오는데 실패했습니다</Text>
//                 <Text typography="t5">혹은 잘못된 접근입니다.</Text>
//                 <Button size="sm" role="round" onClick={() => reset()}>
//                     다시 시도하기
//                 </Button>
//                 <Button size="sm" role="round" onClick={() => (window.location.href = '/')}>
//                     홈으로
//                 </Button>
//             </div>
//         </Slide>
//     );
// };

// export default ErrorPage;
