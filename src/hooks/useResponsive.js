/**
 * src/hooks/useResponsive.js
 *
 * Returns whether the current screen is tablet-sized.
 * Uses React Native's Dimensions API (not window.innerWidth).
 * Updates automatically when the device rotates.
 */

import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { BREAKPOINT } from '../styles/tokens.js';

export function useResponsive() {
  const [dims, setDims] = useState(Dimensions.get('window'));

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => {
      setDims(window);
    });
    return () => sub?.remove();
  }, []);

  return {
    width:    dims.width,
    height:   dims.height,
    isTablet: dims.width >= BREAKPOINT.tablet,
  };
}
