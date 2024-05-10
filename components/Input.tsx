'use client';

import { Children, HTMLAttributes, ReactElement, ReactNode, cloneElement, useId } from 'react';
import styled from 'styled-components';

interface InputProps extends HTMLAttributes<HTMLDivElement> {
    label?: ReactNode;
    children: ReactElement;
    bottomText?: string;
}

/** Input 컴포넌트는 children 으로 ReactElement 타입을 갖는다. 예시) <div>, <Component>
 * Children.only 함수는 children 이 하나의 ReactElement 인지 확인하고 그 자식을 반환하는 함수이다.
 * 이때 그 값을 child 에 할당해줬다.
 * child.props 객체를 통해 해당 엘리먼트의 속성들에 접근할 수 있다.
 *
 * label 태그에 useId 로 생성한 id 를 넣어준다
 * cloneElement 를 통해 children 으로 넣어준 ReactElement 를 복제하고 새로운 id 속성을 추가해 label 과 연결시킨다.
 * 즉 기존의 다른 모든 속성들을 유지한 새로운 Element 를 생성한다.
 */

function Input({ label, children, bottomText, ...props }: InputProps) {
    const child = Children.only(children);
    const generatedId = useId();
    const id = child.props.id ?? generatedId;
    const isError: boolean = child.props.hasError ?? false;

    return (
        <Self {...props}>
            <Label htmlFor={id}>{label}</Label>
            {cloneElement(child, {
                id,
                ...child.props,
            })}
            {bottomText != null ? <Text isError={isError}>{bottomText}</Text> : null}
        </Self>
    );
}

export default Input;

const Self = styled.div`
    width: 100%;
    background-color: aliceblue;
`;

const Label = styled.label`
    display: inline-block;
    padding: 5px 0;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.6;
    color: ${(props) => props.theme.colors.grey700};
`;

const Text = styled.p<{ isError?: boolean }>`
    color: ${(props) => (props.isError ? props.theme.colors.red600 : props.theme.colors.grey600)};
    margin-top: 4px;
    display: inline-block;
    font-weight: 400;
    font-size: 15px;
`;
