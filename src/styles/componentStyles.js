/**
 * src/styles/componentStyles.js
 * StyleSheet values for React Native components.
 * values reference tokens — never hard-coded.
 */

import { StyleSheet } from 'react-native';
import { COLOR, FONT, SPACE, RADIUS } from './tokens.js';

// Avatar background colours cycling through colour palette
const AVATAR_COLORS = [
  COLOR.roiRed,
  COLOR.roiCharcoal,
  COLOR.roiGrey,
  COLOR.roiBurntOrange,
  COLOR.roiMidGrey,
  '#7a1416',
];
export const avatarBgForIndex = (idx) => AVATAR_COLORS[idx % AVATAR_COLORS.length];

export const shared = StyleSheet.create({
  // Page scaffold
  screen: {
    flex:            1,
    backgroundColor: COLOR.pageBg,
  },

  //Page header banner
  pageHeader: {
    backgroundColor: COLOR.roiRed,
    paddingHorizontal: SPACE.lg,
    paddingTop:      SPACE.xl,
    paddingBottom:   SPACE.lg,
  },
  pageHeaderRow: {
    backgroundColor: COLOR.roiRed,
    paddingHorizontal: SPACE.lg,
    paddingTop:      SPACE.xl,
    paddingBottom:   SPACE.lg,
    flexDirection:   'row',
    alignItems:      'center',
    gap:             SPACE.md,
  },
  pageTitle: {
    fontFamily:  FONT.family,
    fontSize:    FONT.size.xl,
    fontWeight:  FONT.weight.bold,
    color:       COLOR.white,
  },
  pageSubtitle: {
    fontFamily:  FONT.family,
    fontSize:    FONT.size.sm,
    color:       'rgba(255,255,255,0.82)',
    marginTop:   SPACE.xs,
  },

  // Cards
  card: {
    backgroundColor: COLOR.cardBg,
    borderRadius:    RADIUS.md,
    marginBottom:    SPACE.md,
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 1 },
    shadowOpacity:   0.10,
    shadowRadius:    2,
    elevation:       2,           // Android shadow
  },
  cardAccent: {
    backgroundColor: COLOR.cardBg,
    borderRadius:    RADIUS.md,
    marginBottom:    SPACE.md,
    borderLeftWidth: 4,
    borderLeftColor: COLOR.roiRed,
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 1 },
    shadowOpacity:   0.10,
    shadowRadius:    2,
    elevation:       2,
  },

  // Section header (inside card)
  sectionHeader: {
    flexDirection:   'row',
    alignItems:      'center',
    padding:         SPACE.md,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.roiLightGrey,
    backgroundColor: '#fafafa',
    gap:             SPACE.sm,
  },

  // Typography
  // ROI Red → main headings, Charcoal → sub, Grey → further sub (p.12)
  h1: {
    fontFamily:  FONT.family,
    fontSize:    FONT.size.lg,
    fontWeight:  FONT.weight.bold,
    color:       COLOR.roiRed,
    marginBottom: SPACE.sm,
  },
  h2: {
    fontFamily:  FONT.family,
    fontSize:    FONT.size.md,
    fontWeight:  FONT.weight.bold,
    color:       COLOR.roiCharcoal,
    marginBottom: SPACE.xs,
  },
  h3: {
    fontFamily:  FONT.family,
    fontSize:    FONT.size.base,
    fontWeight:  FONT.weight.bold,
    color:       COLOR.roiGrey,
    marginBottom: SPACE.xs,
  },
  body: {
    fontFamily:  FONT.family,
    fontSize:    FONT.size.base,
    color:       COLOR.roiCharcoal,
    lineHeight:  21,
  },
  muted: {
    fontFamily:  FONT.family,
    fontSize:    FONT.size.sm,
    color:       COLOR.roiGrey,
  },
  micro: {
    fontFamily:  FONT.family,
    fontSize:    FONT.size.xs,
    color:       COLOR.roiGrey,
  },
  link: {
    fontFamily:  FONT.family,
    fontSize:    FONT.size.base,
    color:       COLOR.roiBurntOrange,   // Burnt Orange for links per p.12
  },

  // Buttons
  btnPrimary: {
    backgroundColor: COLOR.roiRed,
    borderRadius:    RADIUS.sm,
    paddingVertical: SPACE.md,
    alignItems:      'center',
    justifyContent:  'center',
    flexDirection:   'row',
    gap:             SPACE.sm,
  },
  btnPrimaryText: {
    fontFamily:  FONT.family,
    fontSize:    FONT.size.base,
    fontWeight:  FONT.weight.bold,
    color:       COLOR.white,
  },
  btnSecondary: {
    backgroundColor: COLOR.roiLightGrey,
    borderRadius:    RADIUS.sm,
    paddingVertical: SPACE.md,
    alignItems:      'center',
    justifyContent:  'center',
  },
  btnSecondaryText: {
    fontFamily:  FONT.family,
    fontSize:    FONT.size.base,
    fontWeight:  FONT.weight.bold,
    color:       COLOR.roiCharcoal,
  },

  // Inputs
  input: {
    borderWidth:     1,
    borderColor:     COLOR.roiLightGrey,
    borderRadius:    RADIUS.sm,
    paddingHorizontal: SPACE.md,
    paddingVertical: SPACE.sm,
    fontFamily:      FONT.family,
    fontSize:        FONT.size.base,
    color:           COLOR.roiCharcoal,
    backgroundColor: COLOR.white,
  },
  inputError: {
    borderColor:     COLOR.roiRed,
    backgroundColor: '#fdf8f8',
  },
  inputLabel: {
    fontFamily:   FONT.family,
    fontSize:     FONT.size.sm,
    fontWeight:   FONT.weight.bold,
    color:        COLOR.roiCharcoal,
    marginBottom: SPACE.xs,
  },
  inputErrorText: {
    fontFamily:  FONT.family,
    fontSize:    FONT.size.xs,
    color:       COLOR.roiRed,
    marginTop:   SPACE.xs,
  },

  // Divider
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.roiLightGrey,
  },

  //  Avatar
  avatarSm: {
    width:           40,
    height:          40,
    borderRadius:    20,
    alignItems:      'center',
    justifyContent:  'center',
  },
  avatarLg: {
    width:           72,
    height:          72,
    borderRadius:    36,
    alignItems:      'center',
    justifyContent:  'center',
  },
  avatarTextSm: {
    fontFamily:  FONT.family,
    fontSize:    FONT.size.sm,
    fontWeight:  FONT.weight.bold,
    color:       COLOR.white,
  },
  avatarTextLg: {
    fontFamily:  FONT.family,
    fontSize:    FONT.size.xl,
    fontWeight:  FONT.weight.bold,
    color:       COLOR.white,
  },
});
