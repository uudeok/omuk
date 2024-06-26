import { DefaultTheme } from 'styled-components';

export const colors = {
    mainColor: '#ffd55c',
    mainColorDk: '#fbc62e',
    mainColorLg: '#ffdd7b',
    black: '#000000',
    white: '#FFFFFF',
    whitesmoke: '#F5F5F5',
    grey50: '#f9fafb',
    grey100: '#f2f4f6',
    grey200: '#e5e8eb',
    grey300: '#d1d6db',
    grey400: '#b0b8c1',
    grey500: '#8b95a1',
    grey600: '#6b7684',
    grey700: '#4e5968',
    grey800: '#333d4b',
    grey900: '#191f28',
    greyOpacity50: 'rgba(0, 23, 51, 0.02)',
    greyOpacity100: 'rgba(2, 32, 71, 0.05)',
    greyOpacity200: 'rgba(0, 27, 55, 0.1)',
    greyOpacity300: 'rgba(0, 29, 58, 0.18)',
    greyOpacity400: 'rgba(0, 29, 54, 0.31)',
    greyOpacity500: 'rgba(3, 24, 50, 0.46)',
    greyOpacity600: 'rgba(0, 19, 43, 0.58)',
    greyOpacity700: 'rgba(3, 18, 40, 0.7)',
    greyOpacity800: 'rgba(0, 12, 30, 0.8)',
    greyOpacity900: 'rgba(2, 9, 19, 0.91)',
    blue50: '#e8f3ff',
    blue200: '#90c2ff',
    blue100: '#c9e2ff',
    blue300: '#64a8ff',
    blue400: '#4593fc',
    blue500: '#3182f6',
    blue600: '#2272eb',
    blue700: '#1b64da',
    blue800: '#1957c2',
    blue900: '#194aa6',
    red50: '#ffebee',
    red100: '#ffcdd2',
    red200: '#ef9a9a',
    red300: '#e57373',
    red400: '#ef5350',
    red500: '#f44336',
    red600: '#e53935',
    red700: '#d32f2f',
    red800: '#c62828',
    red900: '#b71c1c',
} as const;

const deviceSizes = {
    mobile: '390px',
    tablet: '768px',
    desktop: '1536px',
};

const devices = {
    mobile: `screen and (min-width: ${deviceSizes.mobile})`,
    tablet: `screen and (min-width: ${deviceSizes.tablet})`,
    desktop: `screen and (min-width: ${deviceSizes.desktop})`,
} as const;

const fonts = {};

export type ColorsType = typeof colors;
export type DevisesType = typeof devices;

export const theme: DefaultTheme = {
    colors,
    devices,
};
