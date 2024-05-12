'use client';

import Link from 'next/link';
import styled from 'styled-components';
import Text from '@/components/common/Text';

/** css 으로 metadata 사용이 안되는데, 이 문제 해결 고민 */

const NotFound = () => {
    return (
        <Self>
            <Text typography="t1">존재하지 않는 페이지 입니다.</Text>
            <Link href="/">홈으로</Link>
        </Self>
    );
};

export default NotFound;

const Self = styled.div`
    margin: 10px auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
