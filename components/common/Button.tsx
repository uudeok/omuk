import React, { ButtonHTMLAttributes } from 'react';
import { ButtonBase, Role, Size } from './ButtonBase';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    role?: Role;
    size: Size;
}

const Button = (props: ButtonProps) => {
    const { size, role, children, ...rest } = props;

    return (
        <ButtonBase size={size} role={role} {...rest}>
            {children}
        </ButtonBase>
    );
};

export default Button;
