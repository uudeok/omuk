'use clinet';

import styles from '../styles/follow.module.css';
import { useState } from 'react';
import Input from './common/Input';
import InputBase from './common/InputBase';
import LoadingBar from './common/LoadingBar';
import List, { ListRow } from './common/List';
import Avatar from './common/Avatar';
import Button from './common/Button';
import Text from './common/Text';
import { useInput, useSession } from '@/hooks';
import { searchUserData, ProfileType } from '@/services/userService';
import { getFollowerInfo, getFollowingInfo } from '@/services/followService';
import { useQueries } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getTotalRows } from '@/shared/utils/detailUtil';

const Follow = () => {
    const session = useSession();
    const router = useRouter();
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const [value, onChangeInput, isValid] = useInput({ minLength: 2 });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [profile, setProfile] = useState<ProfileType | null>();

    const fetchData = [
        { queryKey: 'followingInfo', queryFn: getFollowingInfo },
        { queryKey: 'followerInfo', queryFn: getFollowerInfo },
    ];

    const combinedQueries = useQueries({
        queries: fetchData.map((data) => ({
            queryKey: [data.queryKey],
            queryFn: () => data.queryFn(),
        })),
        combine: (results) => {
            return {
                data: results.map((result) => result.data),
                pending: results.some((result) => result.isPending),
            };
        },
    });

    const handleSearchUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setHasSearched(true);
        setIsLoading(true);
        const profiles = await searchUserData(value);
        setIsLoading(false);
        setProfile(profiles);
    };

    // 검색창 입력 시, 초기화 작업
    const resetProfile = () => {
        setProfile(null);
        setHasSearched(false);
    };

    if (combinedQueries.pending) return <LoadingBar />;

    const [followingInfo, followerInfo] = combinedQueries.data;

    const totalFollowing = getTotalRows(followingInfo);
    const totalFollower = getTotalRows(followerInfo);

    return (
        <>
            <form className={styles.search} onSubmit={handleSearchUser}>
                <Input>
                    <InputBase
                        placeholder="이메일 또는 이름으로 검색하세요"
                        onChange={onChangeInput}
                        onKeyDown={resetProfile}
                    />
                </Input>
            </form>

            {hasSearched && (
                <div>
                    {isLoading ? (
                        <LoadingBar />
                    ) : profile ? (
                        <div className={styles.profile}>
                            <List>
                                <ListRow
                                    left={<Avatar profile={profile} />}
                                    right={
                                        <div>
                                            <div>
                                                <Button role="round" size="sm">
                                                    방문하기
                                                </Button>
                                            </div>
                                        </div>
                                    }
                                />
                            </List>
                        </div>
                    ) : (
                        <div className={styles.nonProfile}>
                            <Text typography="st3">검색어를 찾을 수 없습니다😅</Text>
                        </div>
                    )}
                </div>
            )}
            <div className={styles.follow}>
                <List>
                    <ListRow
                        onClick={() => router.push('/my/follower')}
                        left={<Text typography="st3">팔로워</Text>}
                        right={totalFollower ? `${totalFollower}명` : '0명'}
                    />
                    <ListRow
                        onClick={() => router.push('/my/following')}
                        left={<Text typography="st3">팔로잉</Text>}
                        right={totalFollowing ? `${totalFollowing}명` : '0명'}
                    />
                </List>
            </div>
        </>
    );
};

export default Follow;
