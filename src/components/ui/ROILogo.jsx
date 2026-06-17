/**
 * src/components/ui/ROILogo.jsx
 *
 * ROI corporate logo for React Native.
 * Rendered as an image from company style guidlines.
 *
 * Style Guide rules (p.3 & p.4):
 *  - Red rectangle background, white serif "ROI" lettering
 *  - Never distort, recolour, or overlap
 *  - Minimum width: 110px mobile, 130px tablet
 */

import { Image } from 'react-native';

export function ROILogo({ width = 130 }) {
  const height = Math.round(width / 1.92);

  return (
  <Image
    source={{ uri: 'https://raw.githubusercontent.com/Lucas-Hume/ROI_assets/main/assets/ROI_logo.jpg' }}
    style={{ width, height: Math.round(width / 1.92) }}
    resizeMode="contain"
    accessibilityLabel="Red Opal Innovations"
  />
);
}
