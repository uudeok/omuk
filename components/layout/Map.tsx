'use client';

import styles from '../../styles/map.module.css';
import { useMap } from '@/shared/context/MapProvider';
import LoadingBar from '../common/LoadingBar';

const Map = () => {
    const { mapEl, isLoading } = useMap();

    return (
        <>
            {isLoading && (
                <div className={styles.loadingOverlay}>
                    <LoadingBar status="열심히 불러오는 중" />
                </div>
            )}
            <div ref={mapEl} className={styles.map}></div>
        </>
    );
};

export default Map;
