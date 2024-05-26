'use client';

import { useRouter } from 'next/navigation';
import Input from './common/Input';
import InputBase from './common/InputBase';
import { useInput, useKeyword } from '@/hooks';

const Search = () => {
    const [value, onChangeInput, isValid] = useInput();
    const router = useRouter();
    const { searchKeyword } = useKeyword();

    const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        searchKeyword(value);
        // router.push(`/?search=${value}`);
    };

    return (
        <form onSubmit={handleSubmitSearch}>
            <Input>
                <InputBase placeholder="지역 및 음식점을 검색해주세요" onChange={onChangeInput} />
            </Input>
        </form>
    );
};

export default Search;
