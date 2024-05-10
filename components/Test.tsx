'use client';

import Input from './common/Input';
import BigInput from './common/BigInput';
import useInput from '@/hooks/useInput';
import styled from 'styled-components';
import Button from './common/Button';
import Badge from './common/Badge';

const Categories = ['맛있어요', '싱거워요', '짜요', '뷰맛집', '가족모임👍', '데이트코스'];

const Test = () => {
    const [value, onChangeInput, isValid] = useInput({ minLength: 3, type: 'string' });

    const handleBadge = (category: string) => {
        console.log(category);
    };

    return (
        <Self>
            <Input bottomText="대&소문자, 특수기호를 포함한 7자리 이상 입력해주세요" label="비밀번호">
                <BigInput hasError={!isValid} placeholder="비밀번호를 입력해주세요" onChange={onChangeInput} />
            </Input>
            <Button size="lg" role="round" disabled={!isValid || !value}>
                확인
            </Button>

            <BadgeList>
                {Categories.map((category) => (
                    <Badge key={category} onClick={() => handleBadge(category)}>
                        {category}
                    </Badge>
                ))}
            </BadgeList>
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

const BadgeList = styled.div`
    display: flex;
    gap: 10px;
`;
