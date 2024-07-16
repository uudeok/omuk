import styles from '../../styles/common/inputbase.module.css';
import React, { forwardRef } from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    $hasError?: boolean;
};

const InputBase = forwardRef<HTMLInputElement, Props>(({ $hasError, ...props }, ref) => {
    return <input ref={ref} className={`${styles.inputBase} ${$hasError ? styles.hasError : ''}`} {...props} />;
});

InputBase.displayName = 'InputBase';

export default InputBase;
