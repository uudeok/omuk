import React, { useContext, ReactNode } from 'react';
import { DropdownContext } from '@/shared/context/DropdownContext';

export const DropdownMenu: React.FC<{ children: ReactNode; className?: string }> = ({
    children,
    className,
    ...props
}) => {
    const { isOpen } = useContext(DropdownContext);
    return isOpen ? (
        <div className={className} {...props}>
            {children}
        </div>
    ) : null;
};

export const DropdownOption: React.FC<{ value: string; className?: string }> = ({ value, className, ...props }) => {
    const { selectOption } = useContext(DropdownContext);
    return (
        <div onClick={() => selectOption(value)} className={className} {...props}>
            {value}
        </div>
    );
};

export const DropdownToggle: React.FC<{ children: ReactNode; className?: string }> = ({
    children,
    className,
    ...props
}) => {
    const { toggleDropdown, selectedOption } = useContext(DropdownContext);
    return (
        <button onClick={toggleDropdown} className={className} {...props}>
            {selectedOption || children}
        </button>
    );
};
