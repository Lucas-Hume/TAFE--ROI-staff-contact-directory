/**
 * App.jsx — Root component
 *
 * Red Opal Innovations Staff Contact Directory — React Native (Expo)
 *
 * Three screens managed with simple state-based navigation:
 *   "list"    → StaffListPage    — see all staff profiles
 *   "profile" → StaffProfilePage — view a single staff profile
 *   "form"    → StaffFormPage    — add or edit a staff profile
 *
 * Uses SafeAreaView so content clears Android status bar and notches.
 */

import { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Navigation }       from './src/components/layout/Navigation.jsx';
import { StaffListPage }    from './src/pages/StaffListPage.jsx';
import { StaffProfilePage } from './src/pages/StaffProfilePage.jsx';
import { StaffFormPage }    from './src/pages/StaffFormPage.jsx';
import { useResponsive }    from './src/hooks/useResponsive.js';
import { COLOR }            from './src/styles/tokens.js';

export default function App() {
  const [view, setView]         = useState('list');
  const [selectedId, setSelectedId] = useState(null);
  const { isTablet }            = useResponsive();

  const goList    = ()   => { setView('list');    setSelectedId(null); };
  const goProfile = (id) => { setView('profile'); setSelectedId(id);   };
  const goAdd     = ()   => { setView('form');    setSelectedId(null); };
  const goEdit    = (id) => { setView('form');    setSelectedId(id);   };

  // When cancelling the edit form, go back to profile; cancelling add form goes to list
  const formBack = () => (isEdit => isEdit ? goProfile(selectedId) : goList())(selectedId !== null);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor={COLOR.roiCharcoal} barStyle="light-content" />

      <Navigation onHome={goList} isTablet={isTablet} />

      {view === 'list' && (
        <StaffListPage
          onViewProfile={goProfile}
          onAddStaff={goAdd}
          isTablet={isTablet}
        />
      )}
      {view === 'profile' && (
        <StaffProfilePage
          staffId={selectedId}
          onBack={goList}
          onEdit={goEdit}
          isTablet={isTablet}
        />
      )}
      {view === 'form' && (
        <StaffFormPage
          staffId={selectedId}
          onBack={formBack}
          onSaved={goList}
          isTablet={isTablet}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex:            1,
    backgroundColor: COLOR.roiCharcoal,  // matches nav bar behind status bar
  },
});
