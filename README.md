# ROI Staff Contact Directory — Snack Expo

Red Opal Innovations Staff Contact Directory
Built with React Native for Android phone and tablet.

---

## How to load into Snack Expo

### Step 1 — Open Snack
Go to https://snack.expo.dev and sign in (or use as guest).

### Step 2 — Upload files
Click the files icon (top-left panel) then upload ALL files maintaining
the exact folder structure below. Snack needs the paths to match exactly.

### Step 3 — Install dependencies
Snack reads package.json automatically. The two packages needed are:
- react-native-svg (for the ROI logo)
- @react-native-picker/picker (for the department dropdown)

If they don't load automatically, paste this into Snack's package.json tab:
```json
{
  "dependencies": {
    "react-native-svg": "14.1.0",
    "@react-native-picker/picker": "2.6.1"
  }
}
```

### Step 4 — Preview
Use the Android preview panel on the right.
Switch between phone and tablet using the device selector at the top.

---

## File structure (upload exactly as-is)

```
App.jsx                                ← Entry point — upload this first
app.json                               ← Expo config
package.json                           ← Dependencies

src/
├── styles/
│   ├── tokens.js                      ← ROI brand tokens
│   └── componentStyles.js             ← Shared React Native StyleSheets
│
├── data/
│   └── staffStore.js                  ← Sample data from client brief
│
├── hooks/
│   └── useResponsive.js               ← Phone/tablet detection
│
├── components/
│   ├── ui/
│   │   ├── ROILogo.jsx                ← SVG logo (react-native-svg)
│   │   └── Dialog.jsx                 ← Success/error modal dialogs
│   └── layout/
│       └── Navigation.jsx             ← Top nav bar
│
└── pages/
    ├── StaffListPage.jsx              ← All staff — searchable list
    ├── StaffProfilePage.jsx           ← Single staff profile detail
    └── StaffFormPage.jsx              ← Add / edit staff form
```

---

## Functional requirements covered

| Requirement | Where |
|---|---|
| See a listing of all staff profiles | StaffListPage |
| Select a profile to view details | StaffProfilePage |
| Add or update staff profiles | StaffFormPage |
| Success dialogs on save | Dialog (success) |
| Error messages on invalid input | Dialog (error) + inline field errors |
| Android phone portrait | useResponsive → isTablet: false |
| Android tablet landscape | useResponsive → isTablet: true (2-col layout) |
| ROI branding throughout | tokens.js + componentStyles.js |

## Sample data (from client brief, Table 1 & 2)

| ID | Name | Phone | Department |
|---|---|---|---|
| 1 | John Smith | 02 9988 2211 | ICT |
| 2 | Sue White | 03 8899 2255 | Finance |
| 3 | Bob O'Bits | 05 7788 2255 | Marketing |
| 4 | Mary Blue | 06 4455 9988 | Finance |
| 5 | Mick Green | 02 9988 1122 | Marketing |
