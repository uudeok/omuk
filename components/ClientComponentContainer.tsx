'use client';

import styled from 'styled-components';
import StyledComponentsRegistry from '@/styles/registry';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/GlobalStyle';
import { theme } from '../styles/theme';

interface IClientComponentContainerProps {
    children: React.ReactNode;
}

function ClientComponentContainer({ children }: IClientComponentContainerProps) {
    return (
        <StyledComponentsRegistry>
            <GlobalStyle />
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StyledComponentsRegistry>
    );
}

export default ClientComponentContainer;
