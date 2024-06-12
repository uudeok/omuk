import styles from '../../../styles/detailLayout.module.css';
import Slide from '@/components/Slide';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { ReactNode } from 'react';
import { getDetail } from './page';
import Text from '@/components/common/Text';
import List, { ListRow } from '@/components/common/List';
import { calculateScore } from '@/shared/utils/detailUtil';

type PropsType = {
    children: ReactNode;
    params: Params;
};

const DetailLayout = async ({ children, params: { id } }: PropsType) => {
    const resData = await getDetail(id);
    const { basicInfo } = resData;

    return (
        <Slide styles={{ width: '352px', left: '352px' }}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <Text typography="t5">{basicInfo?.placenamefull}</Text>
                </div>

                <List>
                    <ListRow
                        left={<Text typography="st4">리뷰수</Text>}
                        right={<Text typography="st4">{basicInfo?.feedback?.comntcnt}</Text>}
                    />
                    <ListRow
                        left={<Text typography="st4">별점</Text>}
                        right={<Text typography="st4">{calculateScore(basicInfo?.feedback)}/5.0</Text>}
                    />
                </List>
            </div>

            <main className={styles.content}>{children}</main>
        </Slide>
    );
};

export default DetailLayout;
