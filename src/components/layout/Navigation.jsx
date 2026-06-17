/**
 * src/components/layout/Navigation.jsx
 * Top nav bar with settings (accessibility) button.
 */

import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ROILogo } from '../ui/ROILogo.jsx';
import { SettingsModal } from '../ui/SettingsModal.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { SPACE } from '../../styles/tokens.js';

export function Navigation({ onHome, isTablet }) {
  const { colors } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <View style={[styles.nav, { backgroundColor: colors.navBg, borderBottomColor: colors.roiRed }]}>
        <TouchableOpacity
          onPress={onHome}
          accessibilityRole="button"
          accessibilityLabel="Go to staff directory"
          style={styles.logoBtn}
        >
          <ROILogo width={isTablet ? 130 : 110} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSettingsOpen(true)}
          accessibilityRole="button"
          accessibilityLabel="Open accessibility settings"
          style={styles.settingsBtn}
        >
          <Text style={styles.settingsIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      <SettingsModal visible={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    borderBottomWidth: 3,
    height:            54,
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: SPACE.lg,
  },
  logoBtn:      { padding: 0 },
  settingsBtn:  { padding: 6 },
  settingsIcon: { fontSize: 24, color: '#ffffff' },
});