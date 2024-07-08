'use client';

import { useRouter } from 'next/navigation';
import styles from '../../styles/mobile/controller.module.css';
import Button from '../common/Button';
import { useState } from 'react';

const Controller = ({ res_id }: any) => {
    const [selected, setSelected] = useState(0);
    const router = useRouter();

    const CONTROLLER = [
        { key: '정보', path: `/m/${res_id}` },
        { key: '지도', path: `/m/${res_id}/map` },
    ];

    return (
        <div className={styles.controller}>
            {CONTROLLER.map((button, idx) => (
                <Button
                    key={idx}
                    className={idx === selected ? styles.selected : styles.unselected}
                    size="sm"
                    onClick={() => {
                        setSelected(idx);
                        router.push(button.path);
                    }}
                >
                    {button.key}
                </Button>
            ))}
        </div>
    );
};

export default Controller;
