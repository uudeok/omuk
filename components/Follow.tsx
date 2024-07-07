'use clinet';

import styles from '../styles/follow.module.css';
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
    const { data: followingTotalRows, refetch: refetchFollowingInfo } = useQuery({
        queryKey: ['followingTotalRows'],
        queryFn: getFollowingTotalRows,
        staleTime: 1000 * 60,
    });

    // 팔로워 수 불러옴 status 상관없음
    const { data: followerTotalRows } = useQuery({
        queryKey: ['followerTotalRows', 'all'],
        queryFn: () => getFollowerTotalRows(),
        staleTime: 1000 * 60,
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
                                                    disabled={unfollowMutation.isError}
                                                >
                                                    팔로우 취소
                                                </Button>
                                            ) : (
                                                <Button
                                                    role="round"
                                                    size="sm"
                                                    onClick={() => followMutation.mutate()}
                                                    disabled={followMutation.isPending}
                                                >
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

// 'use clinet';

// import styles from '../styles/follow.module.css';
// import { useCallback, useContext, useEffect, useState } from 'react';
// import Input from './common/Input';
// import InputBase from './common/InputBase';
// import LoadingBar from './common/LoadingBar';
// import List, { ListRow } from './common/List';
// import Avatar from './common/Avatar';
// import Button from './common/Button';
// import Text from './common/Text';
// import { useInput } from '@/hooks';
// import { searchUserData, ProfileType } from '@/services/userService';
// import {
//     FollowType,
//     checkFollowing,
//     getFollowerTotalRows,
//     getFollowingTotalRows,
//     requestFollow,
//     requestUnFollow,
// } from '@/services/followService';
// import { useQuery } from '@tanstack/react-query';
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/shared/context/AuthProvider';

// const Follow = () => {
//     const session = useContext(AuthContext);
//     const router = useRouter();

//     const [value, onChangeInput, isValid] = useInput({ minLength: 2 });
//     const [hasSearched, setHasSearched] = useState<boolean>(false);
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [profile, setProfile] = useState<ProfileType | null>(null);
//     const [hasFollow, setHasFollow] = useState<FollowType | null>(null);

//     // 팔로잉 수 불러옴
//     const { data: followingTotalRows, refetch: refetchFollowingInfo } = useQuery({
//         queryKey: ['followingTotalRows'],
//         queryFn: getFollowingTotalRows,
//     });

//     // 팔로워 수 불러옴 status 상관없음
//     const { data: followerTotalRows } = useQuery({
//         queryKey: ['followerTotalRows', 'all'],
//         queryFn: () => getFollowerTotalRows(),
//         staleTime: 1000 * 60,
//     });

//     // 내가 이미 팔로잉 한 유저인지 검사
//     const checkIfFollowingUser = useCallback(async () => {
//         const isFollow = await checkFollowing(profile!.id);
//         setHasFollow(isFollow);
//     }, [profile, setHasFollow]);

//     useEffect(() => {
//         if (profile) {
//             checkIfFollowingUser();
//         }
//     }, [checkIfFollowingUser, profile]);

//     // 유저 검색 시 수행
//     const handleSearchUser = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         setHasSearched(true);
//         setIsLoading(true);
//         try {
//             const profile = await searchUserData(value);
//             setProfile(profile);
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // 검색창 입력 시, 초기화 작업
//     const resetProfile = () => {
//         setProfile(null);
//         setHasSearched(false);
//         setHasFollow(null);
//     };

//     // follow 요청
//     const handleFollowRequest = async () => {
//         if (!profile || !session) return;

//         try {
//             const user = await requestFollow({
//                 requester_id: session.user.id,
//                 requestee_id: profile.id,
//             });
//             setHasFollow(user);
//             refetchFollowingInfo();
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     // unfollow 요청
//     const handleUnfollowRequest = async () => {
//         if (!profile || !session) return;

//         try {
//             await requestUnFollow(profile.id);
//             refetchFollowingInfo();
//             setHasFollow(null);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <>
//             <form className={styles.search} onSubmit={handleSearchUser}>
//                 <Input>
//                     <InputBase
//                         placeholder="이메일 또는 이름으로 검색하세요"
//                         onChange={onChangeInput}
//                         onKeyDown={resetProfile}
//                     />
//                 </Input>
//             </form>

//             {hasSearched && (
//                 <div>
//                     {isLoading ? (
//                         <LoadingBar />
//                     ) : profile ? (
//                         <div className={styles.profile}>
//                             <List>
//                                 <ListRow
//                                     left={<Avatar profile={profile} />}
//                                     right={
//                                         <div>
//                                             {hasFollow ? (
//                                                 <Button role="round" size="sm" onClick={handleUnfollowRequest}>
//                                                     팔로우 취소
//                                                 </Button>
//                                             ) : (
//                                                 <Button role="round" size="sm" onClick={handleFollowRequest}>
//                                                     팔로우
//                                                 </Button>
//                                             )}
//                                         </div>
//                                     }
//                                 />
//                             </List>
//                         </div>
//                     ) : (
//                         <div className={styles.nonProfile}>
//                             <Text typography="st3">검색어를 찾을 수 없습니다😅</Text>
//                         </div>
//                     )}
//                 </div>
//             )}
//             <div className={styles.follow}>
//                 <List>
//                     <ListRow
//                         onClick={() => router.push('/my/follower')}
//                         left={<Text typography="st3">팔로워</Text>}
//                         right={followerTotalRows ? `${followerTotalRows}명` : '0명'}
//                     />
//                     <ListRow
//                         onClick={() => router.push('/my/following')}
//                         left={<Text typography="st3">팔로잉</Text>}
//                         right={followingTotalRows ? `${followingTotalRows}명` : '0명'}
//                     />
//                 </List>
//             </div>
//         </>
//     );
// };

// export default Follow;
