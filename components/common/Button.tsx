import React, { ButtonHTMLAttributes } from 'react';
import { ButtonBase, Role, Size } from './ButtonBase';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    role?: Role;
    size: Size;
    className?: string;
}

const Button = (props: ButtonProps) => {
    const { size, role, children, className, ...rest } = props;

    return (
        <ButtonBase size={size} role={role} className={className} {...rest}>
            {children}
        </ButtonBase>
    );
};

export default Button;
