import Maps from '@/components/Maps';
import SideBar from '@/components/SideBar';
import Test from '@/components/Test';

export const getDetail = async (id: string) => {
    const response = await fetch(`https://place.map.kakao.com/m/main/v/${id}`);
    return response.json();
};

const HomePage = async () => {
    return (
        <div>
            <div></div>
        </div>
    );
};

export default HomePage;
