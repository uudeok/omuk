'use clinet';

import styles from '../styles/components/myFollow.module.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import Input from './common/Input';
import InputBase from './common/InputBase';
import LoadingBar from './common/LoadingBar';
import List, { ListRow } from './common/List';
import Avatar from './common/Avatar';
import Button from './common/Button';
import Text from './common/Text';
import { useInput } from '@/hooks';
import { searchUserData, ProfileType } from '@/services/userService';
import {
    checkFollowing,
    getFollowerTotalRows,
    getFollowingTotalRows,
    requestFollow,
    requestUnFollow,
} from '@/services/followService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/shared/context/AuthProvider';
import Spinner from './common/Spinner';

const Follow = () => {
    const queryClient = useQueryClient();
    const session = useContext(AuthContext);
    const router = useRouter();

    const [value, onChangeInput, isValid] = useInput({ minLength: 2 });
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [profile, setProfile] = useState<ProfileType | null>(null);
    const [hasFollow, setHasFollow] = useState<boolean>(false);

    // 팔로잉 수 불러옴
    const { data: followingTotalRows } = useQuery({
        queryKey: ['followingTotalRows'],
        queryFn: getFollowingTotalRows,
    });

    // 팔로워 수 불러옴 status 상관없음
    const { data: followerTotalRows } = useQuery({
        queryKey: ['followerTotalRows', 'all'],
        queryFn: () => getFollowerTotalRows(),
    });

    const followMutation = useMutation({
        mutationFn: async () => {
            if (!profile || !session) return;
            return requestFollow({ requester_id: session.user.id, requestee_id: profile.id });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['followingTotalRows'] });
            setHasFollow(true);
        },
    });

    const unfollowMutation = useMutation({
        mutationFn: async () => {
            if (!profile || !session) return;
            return requestUnFollow(profile.id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['followingTotalRows'] });
            setHasFollow(false);
        },
    });

    // 내가 이미 팔로잉 한 유저인지 검사
    const checkIfFollowingUser = useCallback(async () => {
        const result = await checkFollowing(profile!.id);
        const isFollow = result ? true : false;
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
        setSearchLoading(true);
        try {
            const profile = await searchUserData(value);
            setProfile(profile);
        } catch (error) {
            console.error(error);
        } finally {
            setSearchLoading(false);
        }
    };

    // 검색창 입력 시, 초기화 작업
    const resetProfile = () => {
        setProfile(null);
        setHasSearched(false);
    };

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
                    {searchLoading ? (
                        <LoadingBar />
                    ) : profile ? (
                        <div className={styles.profile}>
                            <List>
                                <ListRow
                                    left={<Avatar profile={profile} />}
                                    right={
                                        <div>
                                            {hasFollow ? (
                                                <Button
                                                    role="round"
                                                    size="sm"
                                                    onClick={() => unfollowMutation.mutate()}
                                                    disabled={unfollowMutation.isPending}
                                                >
                                                    {unfollowMutation.isPaused ? <Spinner size="sm" /> : '팔로우 취소'}
                                                </Button>
                                            ) : (
                                                <Button
                                                    role="round"
                                                    size="sm"
                                                    onClick={() => followMutation.mutate()}
                                                    disabled={followMutation.isPending}
                                                >
                                                    {followMutation.isPaused ? <Spinner size="sm" /> : '팔로우'}
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
                        right={followerTotalRows ? `${followerTotalRows}명` : '0명'}
                    />
                    <ListRow
                        onClick={() => router.push('/my/following')}
                        left={<Text typography="st3">팔로잉</Text>}
                        right={followingTotalRows ? `${followingTotalRows}명` : '0명'}
                    />
                </List>
            </div>
        </>
    );
};

export default Follow;
