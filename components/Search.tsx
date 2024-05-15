'use client';

import useInput from '@/hooks/useInput';
import Input from './common/Input';
import InputBase from './common/InputBase';
import { useSearchStore } from '@/store/SearchResult';

const Search = () => {
    const [value, onChangeInput] = useInput();
    const { setKeyword } = useSearchStore();

    console.log(value);

    const handleKeyword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('제출', value);
        setKeyword(value);
    };

    return (
        <form onSubmit={handleKeyword}>
            <Input>
                <InputBase placeholder="음식점 및 장소 검색해주세요" onChange={onChangeInput} />
            </Input>
        </form>
    );
};

export default Search;
