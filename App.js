/**
 * Root component
 * Wraps everything in ThemeProvider so screens
 * have access to the current accessibility theme.
 */

import { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext.jsx';
import { Navigation }       from './src/components/layout/Navigation.jsx';
import { StaffListPage }    from './src/pages/StaffListPage.jsx';
import { StaffProfilePage } from './src/pages/StaffProfilePage.jsx';
import { StaffFormPage }    from './src/pages/StaffFormPage.jsx';
import { useResponsive }    from './src/hooks/useResponsive.js';

function AppContent() {
  const { colors, isDark } = useTheme();
  const { isTablet }       = useResponsive();
  const [view, setView]               = useState('list');
  const [selectedId, setSelectedId]   = useState(null);

  const goList    = ()   => { setView('list');    setSelectedId(null); };
  const goProfile = (id) => { setView('profile'); setSelectedId(id);   };
  const goAdd     = ()   => { setView('form');    setSelectedId(null); };
  const goEdit    = (id) => { setView('form');    setSelectedId(id);   };

  const formBack = () => (selectedId !== null ? goProfile(selectedId) : goList());

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.navBg }]}>
      <StatusBar backgroundColor={colors.navBg} barStyle="light-content" />

      <Navigation onHome={goList} isTablet={isTablet} />

      {view === 'list' && (
        <StaffListPage onViewProfile={goProfile} onAddStaff={goAdd} isTablet={isTablet} />
      )}
      {view === 'profile' && (
        <StaffProfilePage staffId={selectedId} onBack={goList} onEdit={goEdit} isTablet={isTablet} />
      )}
      {view === 'form' && (
        <StaffFormPage staffId={selectedId} onBack={formBack} onSaved={goList} isTablet={isTablet} />
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});