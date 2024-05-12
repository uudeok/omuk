import React, { ReactNode } from 'react';

// 메뉴바 없는 버전 레이아웃
const Layout = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
};

export default Layout;
