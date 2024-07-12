'use client';

import styles from '../../styles/layouts/map.module.css';
import { useMap } from '@/shared/context/MapProvider';
import LoadingBar from '../common/LoadingBar';

const Map = () => {
    const { mapEl, isLoading } = useMap();

    return (
        <>
            {isLoading && (
                <div className={styles.loadingOverlay}>
                    <LoadingBar status="오늘은 뭐 먹지?" />
                </div>
            )}
            <div ref={mapEl} className={styles.map}></div>
        </>
    );
};

export default Map;
