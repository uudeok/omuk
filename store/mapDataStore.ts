import { create } from 'zustand';

type MapDataType = {
    datas: kakao.maps.services.PlacesSearchResult;
    detail: kakao.maps.services.PlacesSearchResultItem;
    setDatas: (newData: kakao.maps.services.PlacesSearchResult) => void;
    setDetail: (newData: kakao.maps.services.PlacesSearchResultItem) => void;
};

export const useMapDataStore = create<MapDataType>((set) => ({
    datas: [],
    // detail: [],
    detail: {
        id: '',
        place_name: '',
        category_name: '',
        category_group_code: 'FD6',
        category_group_name: '',
        phone: '',
        address_name: '',
        road_address_name: '',
        x: '',
        y: '',
        place_url: '',
        distance: '',
    },

    setDatas: (newData) =>
        set(() => ({
            datas: newData,
        })),

    setDetail: (newData) =>
        set(() => ({
            detail: newData,
        })),
}));

export default useMapDataStore;
