/**
 * src/pages/StaffFormPage.jsx
 *
 * Functional requirement: "allow staff profiles to be added or updated"
 *
 * Single form for both Add (staffId = null) and Edit (staffId = number) modes.
 * Validates all required fields, shows inline errors and a Dialog on save/fail.
 *
 * Props:
 *   staffId  {number|null}  — null = add mode, number = edit mode
 *   onBack   {function}     — discard and go back
 *   onSaved  {function}     — called after successful save
 *   isTablet {boolean}
 */

import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getStaffById, addStaff, updateStaff, DEPARTMENTS } from '../data/staffStore.js';
import { Dialog } from '../components/ui/Dialog.jsx';
import { COLOR, FONT, SPACE, RADIUS } from '../styles/tokens.js';
import { shared } from '../styles/componentStyles.js';
import { useTheme } from '../contexts/ThemeContext.jsx';

const EMPTY_FORM = {
  name:         '',
  phone:        '',
  departmentId: 0,
  address: { street: '', city: '', state: '', zip: '', country: 'Australia' },
};

function buildForm(member) {
  if (!member) return EMPTY_FORM;
  return {
    name:         member.name,
    phone:        member.phone,
    departmentId: member.departmentId,
    address:      { ...member.address },
  };
}

function validate(form) {
  const errors = {};
  if (!form.name.trim())              errors.name           = 'Name is required.';
  if (!form.phone.trim())             errors.phone          = 'Phone number is required.';
  if (!form.address.street.trim())    errors['addr.street'] = 'Street address is required.';
  if (!form.address.city.trim())      errors['addr.city']   = 'City is required.';
  if (!form.address.state.trim())     errors['addr.state']  = 'State is required.';
  if (!form.address.zip.trim())       errors['addr.zip']    = 'Postcode is required.';
  if (!form.address.country.trim())   errors['addr.country']= 'Country is required.';
  return errors;
}

export function StaffFormPage({ staffId, onBack, onSaved, isTablet }) {
  const{ colors, fontSizes } = useTheme();
  const isEdit = staffId !== null && staffId !== undefined;
  const member = isEdit ? getStaffById(staffId) : null;

  const [form, setForm]     = useState(() => buildForm(member));
  const [errors, setErrors] = useState({});
  const [dialog, setDialog] = useState({ visible: false, type: 'success', title: '', message: '' });

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
  };

  const setAddr = (field, value) => {
    setForm((prev) => ({ ...prev, address: { ...prev.address, [field]: value } }));
    const key = `addr.${field}`;
    if (errors[key]) setErrors((prev) => { const e = { ...prev }; delete e[key]; return e; });
  };

  const handleSave = () => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setDialog({
        visible: true,
        type:    'error',
        title:   'Missing required fields',
        message: 'Some required fields are missing or incorrect. Please review the highlighted fields and try again.',
      });
      return;
    }

    const payload = {
      name:         form.name.trim(),
      phone:        form.phone.trim(),
      departmentId: Number(form.departmentId),
      address: {
        street:  form.address.street.trim(),
        city:    form.address.city.trim(),
        state:   form.address.state.trim(),
        zip:     form.address.zip.trim(),
        country: form.address.country.trim(),
      },
    };

    if (isEdit) {
      updateStaff(staffId, payload);
      setDialog({ visible: true, type: 'success', title: 'Profile updated', message: `${payload.name}'s profile has been successfully updated.` });
    } else {
      const created = addStaff(payload);
      setDialog({ visible: true, type: 'success', title: 'Staff member added', message: `${created.name} has been added to the staff directory.` });
    }
  };

  const handleDialogClose = () => {
    setDialog((prev) => ({ ...prev, visible: false }));
    if (dialog.type === 'success') onSaved();
  };

  return (
    <View style={shared.screen}>
      {/* ── Header ── */}
      <View style={[shared.pageHeaderRow, { backgroundColor: colors.roiRed }]}>
        <TouchableOpacity
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Discard and go back"
          style={styles.backArrow}
        >
          <Text style={[styles.backArrowText, { color: colors.white }]}>‹</Text>
        </TouchableOpacity>
        <View>
          <Text style={[shared.pageTitle, { fontSize: fontSizes.xl }]}>
            {isEdit ? 'Edit Profile' : 'Add Staff Member'}
          </Text>
          <Text style={[shared.pageSubtitle, { fontSize: fontSizes.sm }]}>Red Opal Innovations</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, isTablet && styles.contentTablet]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Personal details ── */}
        <View style={[shared.card, styles.section, { backgroundColor: colors.cardBg }]}>
          <Text style={[shared.h1, { color: colors.roiRed, fontSize: fontSizes.lg }]}>Personal Details</Text>

          <Field label="Full Name *" error={errors.name} colors={colors} fontSizes={fontSizes}>
            <TextInput
              style={[
                shared.input,
                errors.name && shared.inputError,
                { backgroundColor: colors.cardBg, color: colors.roiCharcoal, borderColor: colors.roiLightGrey, fontSize: fontSizes.base },
              ]}
              value={form.name}
              onChangeText={(v) => setField('name', v)}
              placeholder="e.g. John Smith"
              placeholderTextColor={colors.roiGrey}
              accessibilityLabel="Full name"
            />
          </Field>

          <Field label="Phone *" error={errors.phone} colors={colors} fontSizes={fontSizes}>
            <TextInput
              style={[
                shared.input,
                errors.phone && shared.inputError,
                { backgroundColor: colors.cardBg, color: colors.roiCharcoal, borderColor: colors.roiLightGrey, fontSize: fontSizes.base },
              ]}
              value={form.phone}
              onChangeText={(v) => setField('phone', v)}
              placeholder="e.g. 02 9988 2211"
              placeholderTextColor={colors.roiGrey}
              keyboardType="phone-pad"
              accessibilityLabel="Phone number"
            />
          </Field>

          <Field label="Department *" error={errors.departmentId} last colors={colors} fontSizes={fontSizes}>
            <View
              style={[
                styles.pickerWrapper,
                errors.departmentId && shared.inputError,
                { backgroundColor: colors.cardBg, borderColor: colors.roiLightGrey },
              ]}
            >
              <Picker
                selectedValue={form.departmentId}
                onValueChange={(val) => setField('departmentId', val)}
                accessibilityLabel="Department"
                style={[styles.picker, { color: colors.roiCharcoal }]}
              >
                {DEPARTMENTS.map((dept) => (
                  <Picker.Item key={dept.id} label={dept.name} value={dept.id} />
                ))}
              </Picker>
            </View>
          </Field>
        </View>

        {/* ── Address ── */}
        <View style={[shared.card, styles.section, { backgroundColor: colors.cardBg }]}>
          <Text style={[shared.h1, { color: colors.roiRed, fontSize: fontSizes.lg }]}>Address</Text>

          <Field label="Street *" error={errors['addr.street']} colors={colors} fontSizes={fontSizes}>
            <TextInput
              style={[
                shared.input,
                errors['addr.street'] && shared.inputError,
                { backgroundColor: colors.cardBg, color: colors.roiCharcoal, borderColor: colors.roiLightGrey, fontSize: fontSizes.base },
              ]}
              value={form.address.street}
              onChangeText={(v) => setAddr('street', v)}
              placeholder="e.g. 1 Code Lane"
              placeholderTextColor={colors.roiGrey}
              accessibilityLabel="Street address"
            />
          </Field>

          <Field label="City *" error={errors['addr.city']} colors={colors} fontSizes={fontSizes}>
            <TextInput
              style={[
                shared.input,
                errors['addr.city'] && shared.inputError,
                { backgroundColor: colors.cardBg, color: colors.roiCharcoal, borderColor: colors.roiLightGrey, fontSize: fontSizes.base },
              ]}
              value={form.address.city}
              onChangeText={(v) => setAddr('city', v)}
              placeholder="e.g. Javaville"
              placeholderTextColor={colors.roiGrey}
              accessibilityLabel="City"
            />
          </Field>

          {/* State + Postcode side by side */}
          <View style={styles.row2}>
            <View style={styles.halfField}>
              <Field label="State *" error={errors['addr.state']} colors={colors} fontSizes={fontSizes}>
                <TextInput
                  style={[
                    shared.input,
                    errors['addr.state'] && shared.inputError,
                    { backgroundColor: colors.cardBg, color: colors.roiCharcoal, borderColor: colors.roiLightGrey, fontSize: fontSizes.base },
                  ]}
                  value={form.address.state}
                  onChangeText={(v) => setAddr('state', v)}
                  placeholder="e.g. NSW"
                  placeholderTextColor={colors.roiGrey}
                  accessibilityLabel="State"
                />
              </Field>
            </View>
            <View style={styles.halfField}>
              <Field label="Postcode *" error={errors['addr.zip']} colors={colors} fontSizes={fontSizes}>
                <TextInput
                  style={[
                    shared.input,
                    errors['addr.zip'] && shared.inputError,
                    { backgroundColor: colors.cardBg, color: colors.roiCharcoal, borderColor: colors.roiLightGrey, fontSize: fontSizes.base },
                  ]}
                  value={form.address.zip}
                  onChangeText={(v) => setAddr('zip', v)}
                  placeholder="e.g. 0100"
                  placeholderTextColor={colors.roiGrey}
                  keyboardType="numeric"
                  accessibilityLabel="Postcode"
                />
              </Field>
            </View>
          </View>

          <Field label="Country *" error={errors['addr.country']} last colors={colors} fontSizes={fontSizes}>
            <TextInput
              style={[
                shared.input,
                errors['addr.country'] && shared.inputError,
                { backgroundColor: colors.cardBg, color: colors.roiCharcoal, borderColor: colors.roiLightGrey, fontSize: fontSizes.base },
              ]}
              value={form.address.country}
              onChangeText={(v) => setAddr('country', v)}
              placeholder="e.g. Australia"
              placeholderTextColor={colors.roiGrey}
              accessibilityLabel="Country"
            />
          </Field>
        </View>

        {/* ── Actions ── */}
        <TouchableOpacity
          style={[shared.btnPrimary, { backgroundColor: colors.roiRed }]}
          onPress={handleSave}
          accessibilityRole="button"
          accessibilityLabel={isEdit ? 'Save profile changes' : 'Add staff member'}
        >
          <Text style={[shared.btnPrimaryText, { fontSize: fontSizes.base }]}>
            {isEdit ? '✓  Save Changes' : '+  Add Staff Member'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[shared.btnSecondary, styles.cancelBtn, { backgroundColor: colors.roiLightGrey }]}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Cancel and go back"
        >
          <Text style={[shared.btnSecondaryText, { color: colors.roiCharcoal, fontSize: fontSizes.base }]}>
            Cancel
          </Text>
        </TouchableOpacity>

      </ScrollView>

      {/* ── Success / error dialog ── */}
      <Dialog
        visible={dialog.visible}
        type={dialog.type}
        title={dialog.title}
        message={dialog.message}
        onClose={handleDialogClose}
      />
    </View>
  );
}

// ── Field wrapper ─────────────────────────────────────────────────────────────

function Field({ label, error, children, last = false, colors, fontSizes }) {
  return (
    <View style={{ marginBottom: last ? 0 : SPACE.md }}>
      <Text style={[shared.inputLabel, { color: colors.roiCharcoal, fontSize: fontSizes.sm }]}>
        {label}
      </Text>
      {children}
      {error ? (
        <Text style={[shared.inputErrorText, { color: colors.roiRed, fontSize: fontSizes.xs }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize:   32,
    color:      COLOR.white,
    lineHeight: 36,
  },
  section: {
    padding: SPACE.lg,
  },
  pickerWrapper: {
    borderWidth:   1,
    borderColor:   COLOR.roiLightGrey,
    borderRadius:  RADIUS.sm,
    backgroundColor: COLOR.white,
    overflow:      'hidden',
  },
  picker: {
    height:    50,
    color:     COLOR.roiCharcoal,
  },
  row2: {
    flexDirection: 'row',
    gap:           SPACE.md,
    marginBottom:  SPACE.md,
  },
  halfField: {
    flex: 1,
  },
  cancelBtn: {
    marginTop: SPACE.sm,
  },
});
