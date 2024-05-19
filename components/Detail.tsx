import useMapDataStore from '@/store/mapDataStore';

const Detail = () => {
    const { detail: restaurant } = useMapDataStore();

    return (
        <div>
            <div>{restaurant.place_name}</div>
            <div>id : {restaurant.id}</div>
        </div>
    );
};

export default Detail;
