/**
 * src/contexts/ThemeContext.jsx
 * Provides light/dark mode and large text accessibility settings
 * to every screen in the app.
 */

import { createContext, useContext, useState } from 'react';
import { COLOR} from '../styles/tokens.js';
const LIGHT = {
  ...COLOR,
  navBg:          '#ffffff',
  sectionHeaderBg: '#fafafa',
  iconBg:          '#fdf0f0',
};

const DARK = {
  pageBg:          '#121212',
  cardBg:          '#1e1e1e',
  roiRed:          '#941a1d',
  roiCharcoal:     '#f0f0f0',
  roiGrey:         '#aaaaaa',
  roiBurntOrange:  '#e07060',
  roiMidGrey:      '#888888',
  roiLightGrey:    '#333333',
  white:           '#ffffff',
  navBg:           '#0a0a0a',
  sectionHeaderBg: '#252525',
  iconBg:          '#2a1515',
};

const FONT_SIZES = {
  normal: { xs: 11, sm: 12, base: 14, md: 16, lg: 18, xl: 22, xxl: 26 },
  large:  { xs: 13, sm: 15, base: 17, md: 19, lg: 21, xl: 26, xxl: 30 },
};

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark]       = useState(false);
  const [largeText, setLargeText] = useState(false);

  const toggleDark      = () => setIsDark((prev) => !prev);
  const toggleLargeText = () => setLargeText((prev) => !prev);

  const value = {
    isDark,
    largeText,
    toggleDark,
    toggleLargeText,
    colors:    isDark ? DARK : LIGHT,
    fontSizes: largeText ? FONT_SIZES.large : FONT_SIZES.normal,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
