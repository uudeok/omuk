import styles from '../../styles/ui/spinner.module.css';

type Props = {
    size: Size;
};
type Size = 'sm' | 'md' | 'lg';

const Spinner = ({ size = 'md' }: Props) => {
    let sizeClass;

    switch (size) {
        case 'sm':
            sizeClass = styles.spinnerSm;
            break;
        case 'lg':
            sizeClass = styles.spinnerLg;
            break;
        case 'md':
        default:
            sizeClass = styles.spinnerMd;
    }
    return <div className={`${styles.spinner} ${sizeClass}`}></div>;
};

export default Spinner;
