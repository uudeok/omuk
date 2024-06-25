'use clinet';

import styles from '../styles/follow.module.css';
import { useCallback, useEffect, useState } from 'react';
import Input from './common/Input';
import InputBase from './common/InputBase';
import LoadingBar from './common/LoadingBar';
import List, { ListRow } from './common/List';
import Avatar from './common/Avatar';
import Button from './common/Button';
import Text from './common/Text';
import { useInput, useSession } from '@/hooks';
import { searchUserData, ProfileType } from '@/services/userService';
import {
    checkFollowing,
    getFollowerInfo,
    getFollowingInfo,
    requestFollow,
    requestUnFollow,
} from '@/services/followService';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import useFollowStore from '@/shared/lib/store/useFollowStore';

const Follow = () => {
    const session = useSession();
    const router = useRouter();
    const { setFollowingPagination, setFollowerPagination } = useFollowStore();

    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const [value, onChangeInput, isValid] = useInput({ minLength: 2 });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [profile, setProfile] = useState<ProfileType | null>();
    const [hasFollow, setHasFollow] = useState();

    // 팔로잉 수 불러오는 로직
    const { data: followingInfo, refetch: refetchFollowingInfo } = useQuery({
        queryKey: ['followingInfo'],
        queryFn: getFollowingInfo,
    });

    // 팔로워 수 불러오는 로직
    const { data: followerInfo } = useQuery({
        queryKey: ['followerInfo'],
        queryFn: getFollowerInfo,
    });

    // 내가 이미 팔로잉 한 유저인지 검사
    const checkIfFollowingUser = useCallback(async () => {
        const isFollow = await checkFollowing(profile!.id);
        setHasFollow(isFollow);
    }, [profile, setHasFollow]);

    useEffect(() => {
        if (profile) {
            checkIfFollowingUser();
        }
    }, [checkIfFollowingUser, profile]);

    // 유저 검색 시 수행
    const handleSearchUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setHasSearched(true);
        setIsLoading(true);
        const profile = await searchUserData(value);
        setIsLoading(false);
        setProfile(profile);
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

        refetchFollowingInfo();
    };

    // unfollow
    const handleUnfollowRequest = async () => {
        if (!profile) return;

        if (!session) {
            alert('로그인이 필요한 서비스입니다');
            return;
        }

        await requestUnFollow(profile.id);

        refetchFollowingInfo();
    };

    // 팔로잉, 필로워 수가 바뀔때마다 store 저장
    useEffect(() => {
        setFollowingPagination(followingInfo);
        setFollowerPagination(followerInfo);
    }, [followingInfo, followerInfo]);

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
                                            {hasFollow ? (
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
                        onClick={() => router.push('/my/follower')}
                        left={<Text typography="st3">팔로워</Text>}
                        right={followerInfo ? `${followerInfo}명` : '0명'}
                    />
                    <ListRow
                        onClick={() => router.push('/my/following')}
                        left={<Text typography="st3">팔로잉</Text>}
                        right={followingInfo ? `${followingInfo}명` : '0명'}
                    />
                </List>
            </div>
        </>
    );
};

export default Follow;
