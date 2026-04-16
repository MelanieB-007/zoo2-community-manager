import 'styled-components';
import { theme } from '@/styles/theme';

// Wir extrahieren den Typ aus deinem Theme-Objekt
type CustomTheme = typeof theme;

declare module 'styled-components' {
    export interface DefaultTheme extends CustomTheme {}
}