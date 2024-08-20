import { create } from 'zustand';

type StoreState = {
    resData: any;
    setResData: (data: any) => void;
};

const useResStore = create<StoreState>((set) => ({
    resData: {},
    setResData: (data) => set({ resData: data }),
}));

export default useResStore;
