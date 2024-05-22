'use client';

import StyledComponentsRegistry from '@/styles/registry';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/GlobalStyle';
import { theme } from '../styles/theme';
import { ReactNode } from 'react';

function StyledComponent({ children }: { children: ReactNode }) {
    return (
        <StyledComponentsRegistry>
            <GlobalStyle />
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StyledComponentsRegistry>
    );
}

export default StyledComponent;
