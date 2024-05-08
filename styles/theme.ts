import { DefaultTheme } from 'styled-components';

const colors = {
    mainColor: '#ffd55c',
    mainColorDk: '#fbc62e',
    mainColorLg: '#ffdd7b',
    black: '#000000',
    white: '#FFFFFF',
    whitesmoke: '#F5F5F5',
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
