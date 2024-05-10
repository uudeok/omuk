import { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface Props extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
}

/* aria-label 의 역할이 뭐지 ?*/

function Badge({ children, className, ...rest }: Props) {
    return (
        <Container aria-label="badge" className={className} {...rest}>
            {children}
        </Container>
    );
}

const Container = styled.span`
    display: inline-flex;
    padding: 4px 8px;
    align-items: center;
    justify-content: center;
    line-height: 1.333;
    border-radius: 10px;
    font-weight: bold;
    color: ${(props) => props.theme.colors.grey700};
    background-color: ${(props) => props.theme.colors.greyOpacity200};
`;

export default Badge;
