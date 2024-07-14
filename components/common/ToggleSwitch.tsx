'use client';

import styles from '../../styles/common/toggleSwitch.module.css';
import InputBase from './InputBase';
import List, { ListRow } from './List';
import Text from './Text';

type ToggleProps = {
    off?: string;
    on?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    disabled?: boolean;
};

const ToggleSwitch = ({ off, on, checked, onChange, label, disabled }: ToggleProps) => {
    return (
        <List>
            <ListRow
                left={<Text typography="st3">{label}</Text>}
                right={
                    <div className={styles.toggle}>
                        <Text typography="st4" color="grey">
                            {off}
                        </Text>
                        <label className={styles.switch}>
                            <InputBase
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => onChange(e.target.checked)}
                                disabled={disabled}
                            />
                            <span className={styles.slider}></span>
                        </label>
                        <Text typography="st4">{on}</Text>
                    </div>
                }
            />
        </List>
    );
};

export default ToggleSwitch;
