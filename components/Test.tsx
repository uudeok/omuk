'use client';

import Input from './common/Input';
import BigInput from './common/BigInput';
import useInput from '@/hooks/useInput';
import styled from 'styled-components';
import Button from './common/Button';

const Test = () => {
    const [value, onChangeInput, isValid] = useInput({ minLength: 3, type: 'string' });

    return (
        <Self>
            <Input bottomText="대&소문자, 특수기호를 포함한 7자리 이상 입력해주세요" label="비밀번호">
                <BigInput hasError={!isValid} placeholder="비밀번호를 입력해주세요" onChange={onChangeInput} />
            </Input>
            <Button size="lg" role="round" disabled={!isValid || !value}>
                확인
            </Button>
        </Self>
    );
};

export default Test;

const Self = styled.div`
    width: 500px;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;
