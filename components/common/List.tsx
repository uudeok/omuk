import { ReactNode } from 'react';
import styles from '../../styles/Common.module.css';

type ListRowProps = {
    left: ReactNode;
    right: ReactNode;
    middle?: ReactNode;
    onClick?: () => void;
};

type ListBoxProps = {
    top: ReactNode;
    bottom: ReactNode;
    onClick?: () => void;
};

const List = ({ children }: { children: React.ReactNode }) => {
    return <ul className={styles.list}>{children}</ul>;
};

export const ListRow = ({ left, right, middle, onClick }: ListRowProps) => {
    return (
        <li className={styles.item} onClick={onClick}>
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
