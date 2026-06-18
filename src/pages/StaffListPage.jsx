/**
 * src/pages/StaffListPage.jsx
 *
 * Functional requirement: "see a listing of all company staff profiles"
 *
 * Uses FlatList for performant scrolling on Android.
 * Adapts to a 2-column grid on tablet (landscape).
 *
 * Props:
 *   onViewProfile {function(id)} — navigate to profile view
 *   onAddStaff    {function}     — navigate to add form
 *   isTablet      {boolean}      — tablet layout flag
 */

import { useState, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet,
} from 'react-native';
import { getAllStaff, getDepartmentName } from '../data/staffStore.js';
import { COLOR, FONT, SPACE, RADIUS } from '../styles/tokens.js';
import { shared, avatarBgForIndex } from '../styles/componentStyles.js';
import { useTheme } from '../contexts/ThemeContext.jsx';
import {ImageBackground} from 'react-native';

export function StaffListPage({ onViewProfile, onAddStaff, isTablet }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { colors,fontSizes } = useTheme();
  const [, forceUpdate] = useState(0);  // trigger re-render after add

  const allStaff = getAllStaff();
  const filtered = allStaff.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getDepartmentName(s.departmentId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name) =>
    name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  const renderItem = useCallback(({ item, index }) => (
  <TouchableOpacity
    style={[
      styles.row,
      isTablet && styles.rowTablet,
      index < filtered.length - 1 && shared.divider,
      { backgroundColor: colors.cardBg, borderBottomColor: colors.roiLightGrey },
    ]}
    onPress={() => onViewProfile(item.id)}
    accessibilityRole="button"
    accessibilityLabel={`View profile for ${item.name}`}
  >
    {/* Avatar */}
    <View style={[shared.avatarSm, { backgroundColor: avatarBgForIndex(index) }]}>
      <Text style={shared.avatarTextSm}>{getInitials(item.name)}</Text>
    </View>

    {/* Name + department */}
    <View style={styles.rowText}>
      <Text style={[shared.body, { fontWeight: '700', color: colors.roiCharcoal, fontSize: fontSizes.base }]}>
        {item.name}
      </Text>
      <Text style={[shared.muted, { color: colors.roiGrey, fontSize: fontSizes.sm }]}>
        {getDepartmentName(item.departmentId)}
      </Text>
    </View>

    {/* Chevron */}
    <Text style={[styles.chevron, { color: colors.roiLightGrey }]}>›</Text>
  </TouchableOpacity>
), [filtered.length, isTablet, onViewProfile, colors, fontSizes]);

  // Tablet: 2 columns; phone: 1 column
  const numColumns = isTablet ? 2 : 1;

  return (
    <ImageBackground
      source={{ uri: 'https://raw.githubusercontent.com/Lucas-Hume/ROI_assets/main/assets/Background.jpg' }}
      style={{ flex:1}}
      resizeMode="cover"

    >
      {/* ── Page header ── */}
      <View style={[shared.pageHeader, { backgroundColor: colors.roiRed }]}>
        <Text style={[shared.pageTitle, { fontSize: fontSizes.xl }]}>Staff Directory</Text>
        <Text style={[shared.pageSubtitle, { fontSize: fontSizes.sm }]}>Red Opal Innovations</Text>
      </View>

      {/* ── Content ── */}
      <View style={[styles.content, isTablet && styles.contentTablet]}>

        {/* Search bar */}
        <TextInput
          style={[shared.input, styles.search,
            { backgroundColor: colors.cardBg, color: colors.roiCharcoal, borderColor: colors.roiLightGrey, fontSize: fontSizes.base}
          ]}
          placeholder="Search by name or department…"
          placeholderTextColor={colors.roiGrey}
          value={searchTerm}
          onChangeText={setSearchTerm}
          accessibilityLabel="Search staff members"
          clearButtonMode="while-editing"
        />

        {/* Count + Add button */}
        <View style={styles.toolbar}>
          <Text style={[shared.muted, { color: colors.roiGrey, fontSize: fontSizes.sm}]}>
            {filtered.length} {filtered.length === 1 ? 'staff member' : 'staff members'}
          </Text>
          <TouchableOpacity
            style={[styles.addBtn, {backgroundColor: colors.roiRed}]}
            onPress={onAddStaff}
            accessibilityRole="button"
            accessibilityLabel="Add new staff member"
          >
            <Text style={[styles.addBtnText, {fontSize: fontSizes.sm}]}>+ Add Staff</Text>
          </TouchableOpacity>
        </View>

        {/* Staff list */}
        {filtered.length === 0 ? (
          <View style={[shared.card, styles.empty, {backgroundColor: colors.cardBg}]}>
            <Text style={[shared.muted, {color: colors.roiGrey, fontSize: fontSizes.sm}]}>No staff members match your search.</Text>
          </View>
        ) : (
          <FlatList
            key={numColumns}             // force re-mount when columns change
            data={filtered}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            numColumns={numColumns}
            contentContainerStyle={styles.list}
            style={[shared.card, { marginBottom: 0, backgroundColor: colors.cardBg }]}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flex:    1,
    padding: SPACE.lg,
  },
  contentTablet: {
    maxWidth: 900,
    alignSelf: 'center',
    width:     '100%',
  },
  search: {
    marginBottom: SPACE.md,
  },
  toolbar: {
    flexDirection:   'row',
    alignItems:      'center',
    justifyContent:  'space-between',
    marginBottom:    SPACE.md,
  },
  addBtn: {
    backgroundColor: COLOR.roiRed,
    borderRadius:    RADIUS.sm,
    paddingVertical:   SPACE.sm,
    paddingHorizontal: SPACE.md,
  },
  addBtnText: {
    fontFamily:  FONT.family,
    fontSize:    FONT.size.sm,
    fontWeight:  FONT.weight.bold,
    color:       COLOR.white,
  },
  list: {
    flexGrow: 1,
  },
  row: {
    flexDirection:  'row',
    alignItems:     'center',
    padding:        SPACE.md,
    gap:            SPACE.md,
    backgroundColor: COLOR.white,
  },
  rowTablet: {
    flex: 1,
    margin: SPACE.xs,
  },
  rowText: {
    flex: 1,
  },
  chevron: {
    fontSize:   22,
    color:      COLOR.roiLightGrey,
    lineHeight: 24,
  },
  empty: {
    padding:    SPACE.xl,
    alignItems: 'center',
  },
});
