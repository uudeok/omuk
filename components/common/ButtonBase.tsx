import React from 'react';
import styles from '../../styles/common/buttonbase.module.css';

export type Role = 'round' | 'kakao' | 'cancel' | 'none' | 'google';
export type Size = 'sm' | 'lg';

interface ButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    role?: Role;
    size: Size;
}

const ButtonBase: React.FC<ButtonBaseProps> = ({ role, size, className, ...props }) => {
    const roleClass = role ? styles[`role${role}`] : '';
    const sizeClass = styles[`size${size}`];

    return <button className={`${styles.buttonBase} ${roleClass} ${sizeClass} ${className}`} {...props} />;
};

export default ButtonBase;
