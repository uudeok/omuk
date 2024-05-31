'use client';

import styles from '../styles/controller.module.css';
import Button from './common/Button';

const Controller = () => {
    return (
        <div className={styles.controller}>
            <Button size="lg" role="round">
                전체 보기
            </Button>
            <Button size="lg" role="round">
                방문한 음식점 보기
            </Button>
            <Button size="lg" role="round">
                즐겨찾기한 음식점 보기
            </Button>
        </div>
    );
};

export default Controller;
