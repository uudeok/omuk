'use client';

import styles from '../styles/search.module.css';
import Input from './common/Input';
import InputBase from './common/InputBase';
import { useInput, useKeyword } from '@/hooks';

const Search = () => {
    const [value, onChangeInput] = useInput();
    const { searchKeyword } = useKeyword();

    const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        searchKeyword(value);
    };

    return (
        <form onSubmit={handleSubmitSearch} className={styles.search}>
            <Input>
                <InputBase placeholder="지역 및 음식점을 검색해주세요" onChange={onChangeInput} />
            </Input>
        </form>
    );
};

export default Search;
