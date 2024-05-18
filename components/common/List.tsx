import styled from 'styled-components';
import { ReactNode } from 'react';

type ListRowProps = {
    left: ReactNode;
    right: ReactNode;
    onClick?: () => void;
};

type ListBoxProps = {
    top: ReactNode;
    bottom: ReactNode;
    onClick?: () => void;
};

const List = ({ children }: { children: React.ReactNode }) => {
    return <Self>{children}</Self>;
};

export const ListRow = ({ left, right, onClick }: ListRowProps) => {
    return (
        <Item onClick={onClick}>
            {left}
            {right}
        </Item>
    );
};

export const ListBox = ({ top, bottom, onClick }: ListBoxProps) => {
    return (
        <Box onClick={onClick}>
            {top}
            {bottom}
        </Box>
    );
};

export default List;

const Self = styled.ul`
    /* padding: 5px 24px; */
    display: flex;
    flex-direction: column;
    /* > li:not(:first-of-type) {
        margin-top: 15px;
    } */
`;

const Item = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Box = styled.li`
    display: flex;
    flex-direction: column;
    padding: 20px 25px 16px;
    border-top: 1px solid lightgrey;
    /* border-bottom: 1px solid lightgrey; */
    height: 248px;

    &:hover {
        background-color: ${(props) => props.theme.colors.greyOpacity100};
    }
`;
