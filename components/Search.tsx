'use client';

import { useInput } from '@/hooks/useInput';
import Input from './common/Input';
import InputBase from './common/InputBase';
import { useSearchStore } from '@/store/searchStore';
import { useRouter } from 'next/navigation';
import { useKeyword } from '@/hooks/useKeyword';

const Search = () => {
    const [value, onChangeInput, isValid] = useInput();
    const router = useRouter();
    const { setKeyword } = useSearchStore();
    const { searchKeyword } = useKeyword();

    const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setKeyword(value);
        searchKeyword(value);
        // router.push(`/?search=${value}`);
    };

    return (
        <form onSubmit={handleSubmitSearch}>
            <Input>
                <InputBase placeholder="음식점 및 장소 검색해주세요" onChange={onChangeInput} />
            </Input>
        </form>
    );
};

export default Search;
