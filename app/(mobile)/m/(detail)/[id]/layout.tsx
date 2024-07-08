import styles from '../../../../../styles/mobile/detailLayout.module.css';
import { ReactNode } from 'react';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { getDetail } from './page';
import Text from '@/components/common/Text';
import List, { ListRow } from '@/components/common/List';
import { calculateScore } from '@/shared/utils/detailUtil';
import Controller from '@/components/mobile/Controller';

type PropsType = {
    children: ReactNode;
    params: Params;
};

export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
    const post = await getDetail(id);

    return {
        title: post.basicInfo?.placenamefull,
        description: [...post.basicInfo?.tags],
    };
}

const DetailLayout = async ({ children, params: { id } }: PropsType) => {
    const resData = await getDetail(id);
    const { basicInfo } = resData;

    return (
        <div className={styles.layout}>
            <Controller res_id={id} />
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
        </div>
    );
};

export default DetailLayout;
