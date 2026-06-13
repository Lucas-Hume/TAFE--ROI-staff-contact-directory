/**
 * src/components/layout/Navigation.jsx
 *
 * Top navigation bar.
 * Uses React Native's View/TouchableOpacity instead of HTML nav/button.
 * ROI Charcoal background, ROI Red bottom border (p.10).
 * Logo minimum 110px mobile, 130px tablet (p.3).
 *
 * Props:
 *   onHome   {function} — navigate back to staff list
 *   isTablet {boolean}  — adjusts logo size per style guide minimum widths
 */

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ROILogo } from '../ui/ROILogo.jsx';
import { COLOR, FONT, SPACE } from '../../styles/tokens.js';

export function Navigation({ onHome, isTablet }) {
  return (
    <View style={styles.nav}>
      <TouchableOpacity
        onPress={onHome}
        accessibilityRole="button"
        accessibilityLabel="Go to staff directory"
        style={styles.logoBtn}
      >
        {/* Minimum 110px mobile, 130px tablet per style guide p.3 */}
        <ROILogo width={isTablet ? 130 : 110} />
      </TouchableOpacity>

      <Text style={styles.label}>Staff Directory</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: COLOR.roiCharcoal,
    borderBottomWidth: 3,
    borderBottomColor: COLOR.roiRed,
    height:          54,
    flexDirection:   'row',
    alignItems:      'center',
    justifyContent:  'space-between',
    paddingHorizontal: SPACE.lg,
  },
  logoBtn: {
    padding: 0,
  },
  label: {
    fontFamily: FONT.family,
    fontSize:   FONT.size.sm,
    color:      COLOR.roiLightGrey,
  },
});
