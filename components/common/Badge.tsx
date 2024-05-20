import { HTMLAttributes, ReactNode } from 'react';

import styles from '../../styles/Common.module.css';

interface Props extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
}

/* aria-label 의 역할이 뭐지 ?*/

function Badge({ children }: Props) {
    return (
        <span aria-label="badge" className={styles.badge}>
            {children}
        </span>
    );
}

export default Badge;
