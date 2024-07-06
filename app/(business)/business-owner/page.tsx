'use client';

import styles from '../../../styles/businessOwner.module.css';
import List, { ListRow } from '@/components/common/List';
import { useRouter } from 'next/navigation';
import Pencil from '../../../assets/pencil.svg';
import Text from '@/components/common/Text';
import AddUser from '../../../assets/addUser.svg';

// role !== owner 이면 접근 불가 로직 작성

const BusinessOwnerPage = () => {
    const router = useRouter();

    return (
        <div className={styles.layout}>
            <List>
                <ListRow
                    left={
                        <div onClick={() => router.push('/business-owner/register')}>
                            <Text typography="st3">가게 등록하기</Text>
                        </div>
                    }
                    right={
                        <div onClick={() => router.push('/business-owner/promote')}>
                            <Text typography="st3">홍보하기</Text>
                        </div>
                    }
                />
                <ListRow
                    left={
                        <div onClick={() => router.push('/my/follower')}>
                            <AddUser width={15} />
                            <Text typography="st3">팔로워</Text>
                            <Text typography="st3">N명</Text>
                        </div>
                    }
                    right={
                        <div>
                            <Pencil width={15} />
                            <Text typography="st3">내가 쓴 글</Text>
                            <Text typography="st3">N개</Text>
                        </div>
                    }
                />
            </List>
        </div>
    );
};

export default BusinessOwnerPage;
