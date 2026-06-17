/**
 * src/components/ui/SettingsModal.jsx
 * Accessibility settings panel — dark mode and large text toggles.
 */

import { View, Text, Switch, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext.jsx';

export function SettingsModal({ visible, onClose }) {
  const { isDark, largeText, toggleDark, toggleLargeText, colors, fontSizes } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

      <View style={[styles.panel, { backgroundColor: colors.cardBg }]}>
        <View style={[styles.handle, { backgroundColor: colors.roiLightGrey }]} />

        <Text style={[styles.title, { color: colors.roiRed, fontSize: fontSizes.lg }]}>
          Accessibility Settings
        </Text>
        <Text style={[styles.subtitle, { color: colors.roiGrey, fontSize: fontSizes.sm }]}>
          Adjust display options to suit your needs
        </Text>

        <View style={[styles.divider, { backgroundColor: colors.roiLightGrey }]} />

        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={[styles.rowLabel, { color: colors.roiCharcoal, fontSize: fontSizes.base }]}>
              Dark Mode
            </Text>
            <Text style={[styles.rowDesc, { color: colors.roiGrey, fontSize: fontSizes.sm }]}>
              Reduces brightness for low-light environments
            </Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleDark}
            trackColor={{ false: colors.roiLightGrey, true: colors.roiRed }}
            thumbColor={colors.white}
          />
        </View>

        <View style={[styles.divider, { backgroundColor: colors.roiLightGrey }]} />

        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={[styles.rowLabel, { color: colors.roiCharcoal, fontSize: fontSizes.base }]}>
              Large Text
            </Text>
            <Text style={[styles.rowDesc, { color: colors.roiGrey, fontSize: fontSizes.sm }]}>
              Increases font size across all screens
            </Text>
          </View>
          <Switch
            value={largeText}
            onValueChange={toggleLargeText}
            trackColor={{ false: colors.roiLightGrey, true: colors.roiRed }}
            thumbColor={colors.white}
          />
        </View>

        <View style={[styles.divider, { backgroundColor: colors.roiLightGrey }]} />

        <TouchableOpacity
          onPress={onClose}
          style={[styles.closeBtn, { backgroundColor: colors.roiRed }]}
          accessibilityRole="button"
          accessibilityLabel="Close settings"
        >
          <Text style={styles.closeBtnText}>Done</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop:     { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  panel:        { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, paddingBottom: 40 },
  handle:       { width: 40, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
  title:        { fontWeight: '700', marginBottom: 4 },
  subtitle:     { marginBottom: 16 },
  divider:      { height: 1, marginVertical: 12 },
  row:          { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4 },
  rowText:      { flex: 1, marginRight: 16 },
  rowLabel:     { fontWeight: '700', marginBottom: 2 },
  rowDesc:      { lineHeight: 18 },
  closeBtn:     { marginTop: 16, borderRadius: 6, paddingVertical: 12, alignItems: 'center' },
  closeBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
});