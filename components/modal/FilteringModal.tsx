'use client';

import styles from '../../styles/ui/filteringModal.module.css';
import Icons from '../common/Icons';
import List, { ListCol } from '../common/List';
import Text from '../common/Text';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { locations } from '@/constants';
import { useState } from 'react';

type Props = {
    onClose: () => void;
};

const REVIEW_OPTIONS = ['아이와 함께', '부모님 모시고', '혼밥가능', '가성비최고', '분위기좋은', '뷰맛집', '펫 친화'];
const SORT_OPTIONS = ['최신순', '평점순', '좋아요순'];
const CLASSIFY_OPTIONS = ['전체', '팔로워'];

const FilteringModal = ({ onClose }: Props) => {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLocation(e.target.value);
    };

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRegion(e.target.value);
    };

    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <Text typography="t3">필터</Text>
                    <Icons.FillRotate width={15} />
                    <Text typography="st3">초기화</Text>
                </div>
            </div>

            <div className={styles.list}>
                <List>
                    <ListCol
                        left={<Text typography="t5">정렬</Text>}
                        right={
                            <div className={styles.badgeContainer}>
                                {SORT_OPTIONS.map((option) => (
                                    <div className={styles.badge} key={option}>
                                        <Badge>{option}</Badge>
                                    </div>
                                ))}
                            </div>
                        }
                    />
                </List>

                <div className={styles.listItem}>
                    <List>
                        <ListCol
                            left={<Text typography="t5">지역</Text>}
                            right={
                                <div className={styles.region}>
                                    <select className={styles.dropdown} onChange={handleLocationChange}>
                                        <option value="">선택</option>
                                        <option value="전체">전체</option>
                                        {Object.keys(locations).map((location) => (
                                            <option key={location} value={location}>
                                                {location}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        className={styles.dropdown}
                                        disabled={!selectedLocation}
                                        onChange={handleRegionChange}
                                    >
                                        <option value="">선택</option>
                                        <option value="전체">전체</option>
                                        {locations[selectedLocation]?.map((region) => (
                                            <option key={region} value={region}>
                                                {region}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            }
                        />
                    </List>
                </div>

                <div className={styles.listItem}>
                    <List>
                        <ListCol
                            left={<Text typography="t5">리뷰</Text>}
                            right={
                                <div className={styles.badgeContainer}>
                                    {REVIEW_OPTIONS.map((option) => (
                                        <div className={styles.badge} key={option}>
                                            <Badge>{option}</Badge>
                                        </div>
                                    ))}
                                </div>
                            }
                        />
                    </List>
                </div>

                <div className={styles.listItem}>
                    <List>
                        <ListCol
                            left={<Text typography="t5">구분</Text>}
                            right={
                                <div className={styles.badgeContainer}>
                                    {CLASSIFY_OPTIONS.map((option) => (
                                        <div className={styles.badge} key={option}>
                                            <Badge>{option}</Badge>
                                        </div>
                                    ))}
                                </div>
                            }
                        />
                    </List>
                </div>
            </div>

            <div className={styles.footer}>
                <Button size="lg">필터 적용</Button>
            </div>
        </div>
    );
};

export default FilteringModal;
