import styles from '../styles/ui/skeleton.module.css';

const SkeletonCard = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <span className={styles.avatar}></span>
                <div className={styles.username}></div>
            </div>

            <div className={styles.img}></div>
            <div className={styles.likes}></div>
            <div className={styles.content}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
        </div>
    );
};

export default SkeletonCard;
