import FillStar from '../assets/fillStar.svg';
import Star from '../assets/star.svg';
import Text from './common/Text';
import { useBoolean } from '@/hooks';

const Bookmark = () => {
    const { value: isBookmark, toggle: setBookmark } = useBoolean();

    const handleBookmarkToggle = () => {
        // 여기서 bookmark api 호출 필요
        // 로그인 여부 확인 필요

        setBookmark();
    };

    return (
        <div onClick={() => handleBookmarkToggle()}>
            {isBookmark ? <FillStar width={24} /> : <Star width={24} />}
            <Text typography="t5">즐겨찾기</Text>
        </div>
    );
};

export default Bookmark;
