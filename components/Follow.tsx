'use clinet';

import styles from '../styles/follow.module.css';
import { useState } from 'react';
import Input from './common/Input';
import InputBase from './common/InputBase';
import LoadingBar from './common/LoadingBar';
import List, { ListRow } from './common/List';
import Avatar from './common/\bAvatar';
import Button from './common/Button';
import Text from './common/Text';
import { useInput } from '@/hooks';
import { searchUserData, ProfileType } from '@/services/userService';

const Follow = () => {
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const [value, onChangeInput, isValid] = useInput({ minLength: 2 });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [profile, setProfile] = useState<ProfileType | null>();

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

    const requestFollow = () => {
        console.log('follow');
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
                    {isLoading ? (
                        <LoadingBar />
                    ) : profile ? (
                        <div className={styles.profile}>
                            <List>
                                <ListRow
                                    left={<Avatar profile={profile} />}
                                    right={
                                        <div>
                                            <Button role="round" size="sm" onClick={requestFollow}>
                                                팔로우
                                            </Button>
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
                    <ListRow left={<Text typography="st3">팔로워</Text>} right="5명" />
                    <ListRow left={<Text typography="st3">팔로잉</Text>} right="5명" />
                </List>
            </div>
        </>
    );
};

export default Follow;
