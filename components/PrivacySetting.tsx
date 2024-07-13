'use client';

import styles from '../styles/components/privacySetting.module.css';
import { useState } from 'react';
import List, { ListRow } from './common/List';
import Text from './common/Text';
import ToggleSwitch from './common/ToggleSwitch';
import Setting from '../assets/setting.svg';

const PrivacySetting = () => {
    const [isPublicProfile, setIsPublicProfile] = useState<boolean>(true);
    const [isReviewPublic, setIsReviewPublic] = useState<boolean>(false);
    const [isReviewFollowersOnly, setIsReviewFollowersOnly] = useState<boolean>(false);

    const handlePublicChange = (checked: boolean) => {
        setIsReviewPublic(checked);
        if (checked) {
            setIsReviewFollowersOnly(false);
        }
    };

    const handleFollowersOnlyChange = (checked: boolean) => {
        setIsReviewFollowersOnly(checked);
        if (checked) {
            setIsReviewPublic(false);
        }
    };

    return (
        <div className={styles.setting}>
            <List>
                <ListRow
                    left={
                        <div className={styles.title}>
                            <Setting width={20} />
                            <Text typography="t5">설정</Text>
                        </div>
                    }
                    right={''}
                />
                <ListRow
                    left={<Text typography="st3">아이디/이메일 공개</Text>}
                    right={
                        <ToggleSwitch on="공개" off="비공개" checked={isPublicProfile} onChange={setIsPublicProfile} />
                    }
                />
                <ListRow
                    left={<Text typography="st3">리뷰 전체 공개</Text>}
                    right={
                        <ToggleSwitch on="공개" off="비공개" checked={isReviewPublic} onChange={handlePublicChange} />
                    }
                />
                <ListRow
                    left={<Text typography="st3">리뷰 팔로워에게만 공개</Text>}
                    right={
                        <ToggleSwitch
                            on="공개"
                            off="비공개"
                            checked={isReviewFollowersOnly}
                            onChange={handleFollowersOnlyChange}
                        />
                    }
                />
            </List>
        </div>
    );
};

export default PrivacySetting;
