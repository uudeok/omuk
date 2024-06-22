'use clinet';

import styles from '../styles/follow.module.css';
import { useEffect, useState } from 'react';
import Input from './common/Input';
import InputBase from './common/InputBase';
import LoadingBar from './common/LoadingBar';
import List, { ListRow } from './common/List';
import Avatar from './common/\bAvatar';
import Button from './common/Button';
import Text from './common/Text';
import { useInput, useSession } from '@/hooks';
import { searchUserData, ProfileType } from '@/services/userService';
import { getFollowerList, getFollowingList, requestFollow, requestUnFollow } from '@/services/followService';
import { useQueries } from '@tanstack/react-query';

const Follow = () => {
    const session = useSession();
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const [value, onChangeInput, isValid] = useInput({ minLength: 2 });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [profile, setProfile] = useState<ProfileType | null>();
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    const fetchData = [
        { queryKey: 'followingList', queryFn: getFollowingList },
        { queryKey: 'followerList', queryFn: getFollowerList },
    ];

    const combinedQueries = useQueries({
        queries: fetchData.map((data) => ({
            queryKey: [data.queryKey, isFollowing],
            queryFn: () => data.queryFn(),
        })),
        combine: (results) => {
            return {
                data: results.map((result) => result.data),
                pending: results.some((result) => result.isPending),
            };
        },
    });

    const [followingList, followerList] = combinedQueries.data;

    useEffect(() => {
        if (profile && followingList) {
            const isFollowed = followingList.some((follow) => follow.requestee_id === profile.id);
            setIsFollowing(isFollowed);
        }
    }, [profile, followingList]);

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

    // follow 요청
    const handleFollowRequest = async () => {
        if (!profile) return;

        if (!session) {
            alert('로그인이 필요한 서비스입니다');
            return;
        }

        await requestFollow({
            requester_id: session.user.id,
            requestee_id: profile.id,
        });

        setIsFollowing(true);
    };

    // unfollow
    const handleUnfollowRequest = async () => {
        if (!profile) return;

        if (!session) {
            alert('로그인이 필요한 서비스입니다');
            return;
        }

        await requestUnFollow(profile.id);

        setIsFollowing(false);
    };

    if (combinedQueries.pending) return <LoadingBar />;

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
                                            {isFollowing ? (
                                                <Button role="round" size="sm" onClick={handleUnfollowRequest}>
                                                    팔로우 취소
                                                </Button>
                                            ) : (
                                                <Button role="round" size="sm" onClick={handleFollowRequest}>
                                                    팔로우
                                                </Button>
                                            )}
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
                        left={<Text typography="st3">팔로워</Text>}
                        right={`${followerList ? followerList.length : 0}명`}
                    />
                    <ListRow
                        left={<Text typography="st3">팔로잉</Text>}
                        right={`${followingList ? followingList.length : 0}명`}
                    />
                </List>
            </div>
        </>
    );
};

export default Follow;
