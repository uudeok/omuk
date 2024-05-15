import { create } from 'zustand';

type SearchStoreType = {
    keyword: string;
    setKeyword: (keyword: string) => void;
};

export const useSearchStore = create<SearchStoreType>((set) => ({
    keyword: '',
    setKeyword: (keyword) => set({ keyword }),
}));
