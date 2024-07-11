import styles from '../../../styles/detailLayout.module.css';
import Slide from '@/components/layout/Slide';
import { ReactNode } from 'react';
import Text from '@/components/common/Text';
import List, { ListRow } from '@/components/common/List';
import { calculateScore } from '@/shared/utils/detailUtil';
import { ParamType } from '@/shared/types';
import { getMetadata } from '@/shared/utils/meta';
import { cloudinaryUrl } from '@/shared/utils/cloudinaryUtil';

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

export const generateMetadata = async ({ params: { id } }: ParamType) => {
    const post = await getDetail(id);
    const ogImageUrl = cloudinaryUrl(post.basicInfo?.mainphotourl, { resizeMethod: 'scale', secure: true });

    console.log(ogImageUrl);

    return getMetadata({
        title: post.basicInfo?.placenamefull,
        description: post.basicInfo?.category.catename,
        ogImage: ogImageUrl,
        asPath: `/${id}`,
    });
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

// export const generateMetadata = async ({ params: { id } }: ParamType) => {
//     const post = await getDetail(id);

//     return getMetadata({
//         title: post.basicInfo?.placenamefull,
//         description: post.basicInfo?.category.catename,
//         ogImage: post.basicInfo?.mainphotourl,
//         asPath: `/${id}`,
//     });
// };
