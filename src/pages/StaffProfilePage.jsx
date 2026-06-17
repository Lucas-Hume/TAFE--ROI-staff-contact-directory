/**
 * src/pages/StaffProfilePage.jsx
 *
 * Functional requirement: "select a staff profile to view staff profile details"
 *
 * Props:
 *   staffId  {number}   — id of staff member to display
 *   onBack   {function} — return to staff list
 *   onEdit   {function(id)} — open edit form
 *   isTablet {boolean}
 */

import {
  View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet,
} from 'react-native';
import { getStaffById, getDepartmentName } from '../data/staffStore.js';
import { COLOR, FONT, SPACE, RADIUS } from '../styles/tokens.js';
import { shared, avatarBgForIndex } from '../styles/componentStyles.js';

export function StaffProfilePage({ staffId, onBack, onEdit, isTablet }) {
  const member = getStaffById(staffId);

  if (!member) {
    return (
      <ImageBackground
      source={{ uri: 'https://raw.githubusercontent.com/Lucas-Hume/ROI_assets/main/assets/Background.jpg' }}
      style={{ flex:1}}
      resizeMode="cover">
        <Text style={shared.h1}>Staff member not found.</Text>
        <TouchableOpacity style={[shared.btnPrimary, styles.backBtn]} onPress={onBack}>
          <Text style={shared.btnPrimaryText}>Back to Directory</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  const initials = member.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  const avatarBg = avatarBgForIndex(member.id % 6);
  const deptName = getDepartmentName(member.departmentId);
  const fullAddr = [
    member.address.street,
    member.address.city,
    member.address.state,
    member.address.zip,
    member.address.country,
  ].filter(Boolean).join(', ');

  const handleCall = () => {
    Linking.openURL(`tel:${member.phone.replace(/\s/g, '')}`);
  };

  return (
    <View style={shared.screen}>
      {/* ── Header ── */}
      <View style={shared.pageHeaderRow}>
        <TouchableOpacity
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Back to staff list"
          style={styles.backArrow}
        >
          <Text style={styles.backArrowText}>‹</Text>
        </TouchableOpacity>
        <View>
          <Text style={shared.pageTitle}>Staff Profile</Text>
          <Text style={shared.pageSubtitle}>Red Opal Innovations</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          isTablet && styles.contentTablet,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Profile card ── */}
        <View style={shared.card}>
          <View style={styles.profileTop}>
            {/* Large avatar */}
            <View style={[shared.avatarLg, { backgroundColor: avatarBg }]}>
              <Text style={shared.avatarTextLg}>{initials}</Text>
            </View>
            <View style={styles.nameBlock}>
              <Text style={shared.h1}>{member.name}</Text>
              <Text style={shared.muted}>Staff ID: {member.id}</Text>
            </View>
          </View>

          {/* Detail rows */}
          <DetailRow label="Department" value={deptName} />

          <DetailRow
            label="Phone"
            value={member.phone}
            onPress={handleCall}
            isLink
          />

          <DetailRow label="Address" value={fullAddr} last />
        </View>

        {/* ── Actions ── */}
        <TouchableOpacity
          style={shared.btnPrimary}
          onPress={() => onEdit(member.id)}
          accessibilityRole="button"
          accessibilityLabel="Edit this staff profile"
        >
          <Text style={shared.btnPrimaryText}>✎  Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[shared.btnSecondary, styles.backBtn]}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Back to staff directory"
        >
          <Text style={shared.btnSecondaryText}>Back to Directory</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ── Helper: detail row ────────────────────────────────────────────────────────

function DetailRow({ icon, label, value, onPress, isLink = false, last = false }) {
  return (
    <View style={[styles.detailRow, !last && shared.divider]}>
      {/* Icon in red circle */}
      <View style={styles.iconBox}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>

      <View style={styles.detailText}>
        <Text style={[shared.micro, styles.detailLabel]}>{label.toUpperCase()}</Text>
        {isLink ? (
          <TouchableOpacity onPress={onPress} accessibilityRole="link">
            <Text style={shared.link}>{value}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={shared.body}>{value}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centred: {
    justifyContent: 'center',
    alignItems:     'center',
    padding:        SPACE.lg,
  },
  content: {
    padding: SPACE.lg,
  },
  contentTablet: {
    maxWidth:  700,
    alignSelf: 'center',
    width:     '100%',
  },
  backArrow: {
    paddingRight: SPACE.sm,
  },
  backArrowText: {
    fontSize: 32,
    color:    COLOR.white,
    lineHeight: 36,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems:    'center',
    padding:       SPACE.lg,
    gap:           SPACE.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.roiLightGrey,
  },
  nameBlock: {
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems:    'flex-start',
    padding:       SPACE.md,
    gap:           SPACE.md,
  },
  iconBox: {
    width:           36,
    height:          36,
    backgroundColor: '#fdf0f0',
    borderRadius:    RADIUS.sm,
    alignItems:      'center',
    justifyContent:  'center',
    flexShrink:      0,
  },
  iconText: {
    fontSize: 18,
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    letterSpacing: 0.5,
    marginBottom:  SPACE.xs,
  },
  backBtn: {
    marginTop: SPACE.sm,
  },
});
