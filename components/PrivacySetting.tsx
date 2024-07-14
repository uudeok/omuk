'use client';

import styles from '../styles/components/privacySetting.module.css';
import List, { ListRow } from './common/List';
import Text from './common/Text';
import Setting from '../assets/setting.svg';
import { useState, useEffect } from 'react';
import ToggleSwitch from './common/ToggleSwitch';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ExposeType, getPrivacySetting, handlePrivacySetting } from '@/services/followService';

const PrivacySetting = () => {
    const queryClient = useQueryClient();
    const [isPublicProfile, setIsPublicProfile] = useState<boolean>(true);
    const [isReviewPublic, setIsReviewPublic] = useState<boolean>(isPublicProfile);
    const [isReviewFollowersOnly, setIsReviewFollowersOnly] = useState<boolean>(false);

    const { data } = useQuery({
        queryKey: ['getPrivacySetting'],
        queryFn: getPrivacySetting,
    });

    const exposeToggle = useMutation({
        mutationFn: async (setting: ExposeType) => {
            await handlePrivacySetting(setting);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getPrivacySetting'] });
        },
    });

    console.log(data);

    useEffect(() => {
        if (data) {
            if (data.expose === 'public') {
                setIsPublicProfile(true);
                setIsReviewFollowersOnly(false);
            } else if (data.expose === 'privacy') {
                setIsPublicProfile(false);
                setIsReviewPublic(false);
                setIsReviewFollowersOnly(false);
            } else if (data.expose === 'followers') {
                setIsPublicProfile(true);
                setIsReviewPublic(false);
                setIsReviewFollowersOnly(true);
            }
        }
    }, [data?.expose]);

    // profile 공개 여부
    const handleProfileVisibilityChange = async (checked: boolean) => {
        setIsPublicProfile(checked);
        if (!checked) {
            setIsReviewPublic(false);
            setIsReviewFollowersOnly(false);
            exposeToggle.mutate('privacy');
        } else {
            setIsReviewPublic(true);
            exposeToggle.mutate('public');
        }
    };

    const handlePublicChange = async (checked: boolean) => {
        setIsReviewPublic(checked);
        if (checked) {
            setIsReviewFollowersOnly(false);
            exposeToggle.mutate('public');
        } else {
            setIsReviewFollowersOnly(true);
            exposeToggle.mutate('followers');
        }
    };

    const handleFollowersOnlyChange = async (checked: boolean) => {
        setIsReviewFollowersOnly(checked);
        if (checked) {
            setIsReviewPublic(false);
            exposeToggle.mutate('followers');
        } else {
            setIsReviewPublic(true);
            exposeToggle.mutate('public');
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
                <ToggleSwitch
                    label="아이디/이메일 공개"
                    on="공개"
                    off="비공개"
                    checked={isPublicProfile}
                    onChange={handleProfileVisibilityChange}
                />

                <ToggleSwitch
                    label="리뷰 전체 공개"
                    on="공개"
                    off="비공개"
                    checked={isReviewPublic}
                    onChange={handlePublicChange}
                    disabled={!isPublicProfile}
                />
                <ToggleSwitch
                    label="리뷰 팔로워에게만 공개"
                    on="공개"
                    off="비공개"
                    checked={isReviewFollowersOnly}
                    onChange={handleFollowersOnlyChange}
                    disabled={!isPublicProfile}
                />
            </List>
        </div>
    );
};

export default PrivacySetting;
