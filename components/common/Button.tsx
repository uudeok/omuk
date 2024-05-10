import { ButtonHTMLAttributes, Ref, forwardRef, useId } from 'react';
import { ButtonBase, Role, Size } from './ButtonBase';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    role?: Role;
    size: Size;
}

const Button = forwardRef(function Button(props: Props, forwardedRef: Ref<HTMLButtonElement>) {
    const { size, role, children, ...rest } = props;
    const buttonId = useId();

    return (
        <ButtonBase ref={forwardedRef} id={buttonId} size={size} role={role} {...rest}>
            <span>{children}</span>
        </ButtonBase>
    );
});

export default Button;
