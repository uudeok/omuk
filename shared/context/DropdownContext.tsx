import React, { createContext, useState, ReactNode } from 'react';
import { DropdownMenu, DropdownOption, DropdownToggle } from '@/components/common/Dropdown';

// Dropdown 컴포넌트에서 사용할 Context 타입 정의
type DropdownContextType = {
    isOpen: boolean;
    toggleDropdown: () => void;
    selectedOption: string | null;
    selectOption: (value: string) => void;
};

// Dropdown 컴포넌트에서 사용할 Context 생성
export const DropdownContext = createContext<DropdownContextType>({
    isOpen: false,
    toggleDropdown: () => {},
    selectedOption: null,
    selectOption: () => {},
});

// Dropdown 컴포넌트로 감싸서 사용
const Dropdown: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null); // 선택된 옵션 상태

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectOption = (value: string) => {
        setSelectedOption(value);
        setIsOpen(false);
    };

    return (
        <DropdownContext.Provider value={{ isOpen, toggleDropdown, selectedOption, selectOption }}>
            {children}
        </DropdownContext.Provider>
    );
};

export { Dropdown, DropdownToggle, DropdownMenu, DropdownOption };
