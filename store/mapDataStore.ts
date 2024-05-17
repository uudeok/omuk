import { create } from 'zustand';

type MapDataType = {
    data: kakao.maps.services.PlacesSearchResult;
    setData: (newData: kakao.maps.services.PlacesSearchResult) => void;
};

export const useMapDataStore = create<MapDataType>((set) => ({
    data: [],

    setData: (newData) =>
        set(() => ({
            data: newData,
        })),
}));

export default useMapDataStore;
