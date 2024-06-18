'use client';

import styles from '../../../styles/mypage.module.css';
import { useRouter } from 'next/navigation';
import List, { ListRow } from '@/components/common/List';
import Text from '@/components/common/Text';
import FillStar from '../../../assets/fillStar.svg';
import Pencil from '../../../assets/pencil.svg';
import { getBookmarkList } from '@/services/bookmarkService';
import { useQueries } from '@tanstack/react-query';
import { getReviewList } from '@/services/reviewService';
import LoadingBar from '@/components/common/LoadingBar';
import Input from '@/components/common/Input';
import InputBase from '@/components/common/InputBase';
import { useInput } from '@/hooks';
import { ProfileType, searchUserData } from '@/services/userService';
import { useState } from 'react';
import Avatar from '@/components/common/\bAvatar';
import Button from '@/components/common/Button';

const MyPage = () => {
    const router = useRouter();
    const [value, onChangeInput] = useInput();
    const [profile, setProfile] = useState<ProfileType>();

    const fetchData = [
        { queryKey: 'bookmarkList', queryFn: getBookmarkList },
        { queryKey: 'reviewList', queryFn: getReviewList },
    ];

    const combinedQueries = useQueries({
        queries: fetchData.map((data) => ({
            queryKey: ['getData', data.queryKey],
            queryFn: () => data.queryFn(),
        })),
        combine: (results) => {
            return {
                data: results.map((result) => result.data),
                pending: results.some((result) => result.isPending),
            };
        },
    });

    if (combinedQueries.pending) return <LoadingBar />;

    const [bookmarkList, reviewList] = combinedQueries.data;

    const handleSearchUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const profiles = await searchUserData(value);
        setProfile(profiles);
    };

    return (
        <div>
            <form className={styles.search} onSubmit={handleSearchUser}>
                <Input>
                    <InputBase placeholder="이메일 또는 이름으로 검색하세요" onChange={onChangeInput} />
                </Input>
            </form>

            <div className={styles.follow}>
                <List>
                    <ListRow left={<Text typography="st3">팔로워</Text>} right="5명" />
                    <ListRow left={<Text typography="st3">팔로잉</Text>} right="5명" />
                </List>
            </div>

            <div className={styles.mypage}>
                <List>
                    <ListRow
                        onClick={() => router.push('/my/bookmark')}
                        left={
                            <div>
                                <FillStar width={20} />
                                <Text typography="st3">즐겨찾기</Text>
                            </div>
                        }
                        right={bookmarkList ? `${bookmarkList.length}개` : '아직 없어용'}
                    />
                    <ListRow
                        onClick={() => router.push('/my/review')}
                        left={
                            <div>
                                <Pencil width={20} />
                                <Text typography="st3">나의 리뷰</Text>
                            </div>
                        }
                        right={reviewList ? `${reviewList.length}개` : '아직 없어용'}
                    />
                </List>
            </div>

            {profile && (
                <div className={styles.profile}>
                    <List>
                        <ListRow
                            left={<Avatar profile={profile} />}
                            right={
                                <div>
                                    <Button role="round" size="sm">
                                        팔로우
                                    </Button>
                                </div>
                            }
                        />
                    </List>
                </div>
            )}
        </div>
    );
};

export default MyPage;
