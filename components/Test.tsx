'use client';

import styled from 'styled-components';

const Test = () => {
    return (
        <div>
            <Self3>main lighter</Self3>
            <Self>main</Self>
            <Self2>main darker</Self2>

            <Self4>
                <Self5>
                    <Button1>버튼1</Button1>
                    <Button2>버튼2</Button2>
                </Self5>
            </Self4>
        </div>
    );
};

export default Test;

const Self = styled.div`
    background-color: ${(props) => props.theme.colors.mainColor};
    padding: 1rem;
    /* font-family: ${(props) => props.theme.fonts.pretend}; */
`;

const Self2 = styled.div`
    background-color: ${(props) => props.theme.colors.mainColorDk};
    padding: 1rem;
`;

const Self3 = styled.div`
    background-color: ${(props) => props.theme.colors.mainColorLg};
    padding: 1rem;
`;

const Self4 = styled.div`
    background-color: ${(props) => props.theme.colors.mainColor};
    padding: 2rem;
`;

const Self5 = styled.div`
    /* background-color: ${(props) => props.theme.palette.mainColorDk}; */
    padding: 0.5rem;
    display: flex;
    gap: 1rem;
`;

const Button1 = styled.button`
    border: none;
    background-color: ${(props) => props.theme.colors.mainColorLg};
    width: 150px;
    padding: 0.5rem;
    border-radius: 50px;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.colors.mainColorDk};
    }
`;

const Button2 = styled.button`
    border: none;
    background-color: ${(props) => props.theme.colors.mainColorDk};
    width: 150px;
    padding: 0.5rem;
    border-radius: 50px;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.colors.mainColorLg};
    }
`;
