'use client';

import Input from './Input';
import BigInput from './BigInput';

const Test = () => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };

    return (
        <div>
            <Input bottomText="입력 가능한 최대 금액은 1,000만원 이에요." label="하하하하하">
                <BigInput hasError={false} placeholder="금액을 입력해주세요" />
            </Input>
        </div>
    );
};

export default Test;
