import styles from '../../../../../styles/mobile/detailLayout.module.css';
import { ReactNode } from 'react';
import Text from '@/components/common/Text';
import List, { ListRow } from '@/components/common/List';
import { calculateScore } from '@/shared/utils/detailUtil';
import Controller from '@/components/mobile/Controller';

type PropsType = {
    children: ReactNode;
    params: {
        id: string;
    };
};

const getDetail = async (id: string) => {
    const response = await fetch(`https://place.map.kakao.com/m/main/v/${id}/`);

    if (!response.ok) {
        throw new Error('데이터 가져오기 실패');
    }
    return response.json();
};

async function generateMetadata({ params: { id } }: { params: { id: string } }) {
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
