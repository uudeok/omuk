import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import styles from '../../styles/common/common.module.css';

interface Props extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    color?: string;
    backgroundColor?: CSSProperties['backgroundColor'];
    isSelected?: boolean;
}

const Badge = (props: Props) => {
    const { children, color, backgroundColor, isSelected, ...rest } = props;

    const selectedStyle = isSelected
        ? { backgroundColor: 'var(--mainColor)', color: 'white' }
        : { backgroundColor, color };

    return (
        <span aria-label="badge" className={styles.badge} style={selectedStyle} {...rest}>
            {children}
        </span>
    );
};

export default Badge;
