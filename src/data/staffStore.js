/**
 * src/data/staffStore.js
 *
 * In-memory staff data storage  from the client
 * brief (Table 1 & Table 2).
 * Note: This is not a real database! It will reset every time the app reloads.
 */

// Departments — Table 2
export const DEPARTMENTS = [
  { id: 0, name: 'General' },
  { id: 1, name: 'Information Communications Technology' },
  { id: 2, name: 'Finance' },
  { id: 3, name: 'Marketing' },
  { id: 4, name: 'Human Resources' },
];

export const getDepartmentName = (id) =>
  DEPARTMENTS.find((d) => d.id === id)?.name ?? 'Unknown';

// People — Table 1
let _staff = [
  {
    id: 1,
    name: 'John Smith',
    phone: '02 9988 2211',
    departmentId: 1,
    address: { street: '1 Code Lane', city: 'Javaville', state: 'NSW', zip: '0100', country: 'Australia' },
  },
  {
    id: 2,
    name: 'Sue White',
    phone: '03 8899 2255',
    departmentId: 2,
    address: { street: '16 Bit Way', city: 'Byte Cove', state: 'QLD', zip: '1101', country: 'Australia' },
  },
  {
    id: 3,
    name: "Bob O'Bits",
    phone: '05 7788 2255',
    departmentId: 3,
    address: { street: '8 Silicon Road', city: 'Cloud Hills', state: 'VIC', zip: '1001', country: 'Australia' },
  },
  {
    id: 4,
    name: 'Mary Blue',
    phone: '06 4455 9988',
    departmentId: 2,
    address: { street: '4 Processor Boulevard', city: 'Appletson', state: 'NT', zip: '1010', country: 'Australia' },
  },
  {
    id: 5,
    name: 'Mick Green',
    phone: '02 9988 1122',
    departmentId: 3,
    address: { street: '700 Bandwidth Street', city: 'Bufferland', state: 'NSW', zip: '0110', country: 'Australia' },
  },
];

let _nextId = 6;

export const getAllStaff = () =>
  [..._staff].sort((a, b) => a.name.localeCompare(b.name));

export const getStaffById = (id) => _staff.find((s) => s.id === id);

export const addStaff = (data) => {
  const newMember = { ...data, id: _nextId++ };
  _staff = [..._staff, newMember];
  return newMember;
};

export const updateStaff = (id, data) => {
  const idx = _staff.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  const updated = { ..._staff[idx], ...data, id };
  _staff = _staff.map((s) => (s.id === id ? updated : s));
  return updated;
};
