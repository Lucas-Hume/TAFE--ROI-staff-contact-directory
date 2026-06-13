/**
 * src/components/ui/ROILogo.jsx
 *
 * ROI corporate logo for React Native.
 * Rendered as an SVG (via react-native-svg, included in Expo).
 *
 * Style Guide rules (p.3 & p.4):
 *  - Red rectangle background, white serif "ROI" lettering
 *  - Never distort, recolour, or overlap
 *  - Minimum width: 110px mobile, 130px tablet
 */

import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import { COLOR, LOGO_MIN_WIDTH } from '../../styles/tokens.js';

export function ROILogo({ width = 130 }) {
  const height = Math.round(width / 1.92);

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 192 100"
      accessibilityLabel="Red Opal Innovations"
      accessibilityRole="image"
    >
      <Rect x="0" y="0" width="192" height="100" fill={COLOR.roiRed} />
      <SvgText
        x="96"
        y="75"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="62"
        fontWeight="400"
        fill={COLOR.white}
        letterSpacing="8"
      >
        ROI
      </SvgText>
    </Svg>
  );
}
