import styles from '../styles/Test.module.css';
import Card2 from './Card2';
import New from './New';
import Search from './Search';

export const getDetail = async (id: string) => {
    const response = await fetch(`https://place.map.kakao.com/m/main/v/${id}`);
    return response.json();
};

const Test = () => {
    return (
        <div className={styles.container}>
            <div className={styles.layout}>
                <div className={styles.search}>
                    <Search />
                </div>

                <New />
            </div>
        </div>
    );
};

export default Test;
