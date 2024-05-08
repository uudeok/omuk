import 'styled-components';
import { ThemeType } from './theme';
import { ColorsType, DevisesType } from './theme';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: ColorsTypes;
        devices: DevicesTypes;
    }
}
