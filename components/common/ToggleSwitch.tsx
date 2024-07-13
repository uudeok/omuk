'use client';

import styles from '../../styles/common/toggleSwitch.module.css';
import InputBase from './InputBase';
import Text from './Text';

type ToggleProps = {
    off?: string;
    on?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
};

const ToggleSwitch = ({ off, on, checked, onChange }: ToggleProps) => {
    return (
        <div className={styles.toggle}>
            <Text typography="st4" color="grey">
                {off}
            </Text>
            <label className={styles.switch}>
                <InputBase type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
                <span className={styles.slider}></span>
            </label>
            <Text typography="st4">{on}</Text>
        </div>
    );
};

export default ToggleSwitch;
