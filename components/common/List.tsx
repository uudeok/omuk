import { ReactNode } from 'react';
import styles from '../../styles/common.module.css';

type ListRowProps = {
    left: ReactNode;
    right: ReactNode;
    middle?: ReactNode;
    onClick?: () => void;
    between?: boolean;
};

type ListBoxProps = {
    top: ReactNode;
    bottom: ReactNode;
    onClick?: () => void;
};

const List = ({ children }: { children: React.ReactNode }) => {
    return <ul className={styles.list}>{children}</ul>;
};

export const ListRow = ({ left, right, middle, onClick, between = true }: ListRowProps) => {
    return (
        <li className={`${styles.item} ${between ? '' : styles.spaceBetween}`} onClick={onClick}>
            {left}
            {middle}
            {right}
        </li>
    );
};

export const ListBox = ({ top, bottom, onClick }: ListBoxProps) => {
    return (
        <li className={styles.box} onClick={onClick}>
            {top}
            {bottom}
        </li>
    );
};

export default List;
