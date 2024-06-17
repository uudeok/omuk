import React, { useContext, ReactNode } from 'react';
import { DropdownContext } from '@/shared/context/DropdownContext';

export const DropdownMenu: React.FC<{ children: ReactNode }> = ({ children, ...props }) => {
    const { isOpen } = useContext(DropdownContext);
    return isOpen ? <div {...props}>{children}</div> : null;
};

export const DropdownOption: React.FC<{ value: string }> = ({ value, ...props }) => {
    const { selectOption } = useContext(DropdownContext);
    return (
        <div onClick={() => selectOption(value)} {...props}>
            {value}
        </div>
    );
};

export const DropdownToggle: React.FC<{ children: ReactNode }> = ({ children, ...props }) => {
    const { toggleDropdown, selectedOption } = useContext(DropdownContext);
    return (
        <button onClick={toggleDropdown} {...props}>
            {selectedOption || children}
        </button>
    );
};
