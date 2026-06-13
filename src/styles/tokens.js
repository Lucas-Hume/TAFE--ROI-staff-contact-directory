/**
 * src/styles/tokens.js
 * ROI Brand Design Tokens — React Native
 * Source: ROI Corporate Style Guide v1
 */

export const COLOR = {
  roiRed:         '#941a1d',
  roiCharcoal:    '#262626',
  roiGrey:        '#595959',
  white:          '#ffffff',
  roiBurntOrange: '#c64c38',
  roiMidGrey:     '#3b3b3b',
  roiLightGrey:   '#D9D9D9',
  pageBg:         '#f4f4f4',
  cardBg:         '#ffffff',
};

// React Native uses fontFamily strings differently per platform.
// Trebuchet MS is available on Android. Fallback is the system sans-serif.
export const FONT = {
  family:        'Trebuchet MS',
  familyFallback:'sans-serif',
  size: {
    xs:   11,
    sm:   12,
    base: 14,
    md:   16,
    lg:   18,
    xl:   22,
    xxl:  26,
  },
  weight: {
    normal: '400',
    bold:   '700',
  },
};

export const SPACE = {
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  24,
  xxl: 32,
};

export const RADIUS = {
  sm: 4,
  md: 6,
  full: 999,
};

// Responsive breakpoint — tablet landscape
export const BREAKPOINT = {
  tablet: 768,
};
