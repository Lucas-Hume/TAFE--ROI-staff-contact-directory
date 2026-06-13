/**
 * src/components/ui/Dialog.jsx
 *
 * Success/error feedback modal.
 * Required by brief: "Screen dialogues/messages must be included to indicate
 * successful actions. Error messages must be included where applicable and
 * be useful and intuitive."
 *
 * Uses React Native Modal — works on both Android phone and tablet.
 *
 * Props:
 *   visible  {boolean}
 *   type     {"success"|"error"}
 *   title    {string}
 *   message  {string}
 *   onClose  {function}
 */

import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLOR, FONT, SPACE, RADIUS } from '../../styles/tokens.js';

export function Dialog({ visible, type = 'success', title, message, onClose }) {
  const isSuccess  = type === 'success';
  const accentColor = isSuccess ? '#1a6e2e' : COLOR.roiRed;
  const bgColor     = isSuccess ? '#f0faf4'  : '#fdf0f0';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      accessibilityViewIsModal
    >
      {/* Backdrop */}
      <View style={styles.backdrop}>
        {/* Dialog box */}
        <View style={[styles.box, { borderTopColor: accentColor }]}>

          {/* Title row */}
          <View style={styles.titleRow}>
            <Text style={[styles.titleText, { color: accentColor }]}>
              {isSuccess ? '✓  ' : '✕  '}{title}
            </Text>
          </View>

          {/* Body */}
          <View style={[styles.body, { backgroundColor: bgColor }]}>
            <Text style={styles.message}>{message}</Text>
            <TouchableOpacity
              style={[styles.okBtn, { backgroundColor: accentColor }]}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="OK, close dialog"
            >
              <Text style={styles.okText}>OK</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex:            1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent:  'center',
    alignItems:      'center',
    padding:         SPACE.lg,
  },
  box: {
    backgroundColor: COLOR.white,
    borderRadius:    RADIUS.md,
    width:           '100%',
    maxWidth:        360,
    overflow:        'hidden',
    borderTopWidth:  4,
    elevation:       8,
  },
  titleRow: {
    padding:         SPACE.md,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.roiLightGrey,
  },
  titleText: {
    fontFamily:  FONT.family,
    fontSize:    FONT.size.md,
    fontWeight:  FONT.weight.bold,
  },
  body: {
    padding: SPACE.lg,
  },
  message: {
    fontFamily:   FONT.family,
    fontSize:     FONT.size.base,
    color:        COLOR.roiCharcoal,
    lineHeight:   21,
    marginBottom: SPACE.lg,
  },
  okBtn: {
    borderRadius:    RADIUS.sm,
    paddingVertical: SPACE.md,
    alignItems:      'center',
  },
  okText: {
    fontFamily:  FONT.family,
    fontSize:    FONT.size.base,
    fontWeight:  FONT.weight.bold,
    color:       COLOR.white,
  },
});
