import { screens } from 'tailwindcss/defaultTheme';

export const deviceSizes = {
  xs: '475px',
  sm: screens.sm, // 640px
  md: screens.md, // 768px
  lg: screens.lg, // 1024px
  xl: screens.xl, // 1280px
  '2xl': screens['2xl'], // 1536px
};

export const devices = {
  mobile: `(min-width: ${deviceSizes.xs})`,
  tablet: `(min-width: ${deviceSizes.sm})`,
  laptop: `(min-width: ${deviceSizes.lg})`,
  desktop: `(min-width: ${deviceSizes.xl})`,
} as const;
