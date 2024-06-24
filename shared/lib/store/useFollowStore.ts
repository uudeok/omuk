import { create } from 'zustand';

type FollowStoreState = {
    followingPagination: number;
    followerPagination: number;
    setFollowingPagination: (info: number) => void;
    setFollowerPagination: (info: number) => void;
};

const useFollowStore = create<FollowStoreState>((set) => ({
    followingPagination: 0,
    followerPagination: 0,
    setFollowingPagination: (info: number) => set({ followingPagination: info }),
    setFollowerPagination: (info: number) => set({ followerPagination: info }),
}));

export default useFollowStore;
