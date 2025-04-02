import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { SnackbarProvider } from './contexts/SnackbarContext';

// Layouts
import Dashboard from './layouts/Dashboard';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import ImmeublesList from './pages/immeubles/ImmeublesList';
import ImmeubleDetails from './pages/immeubles/ImmeubleDetails';
import ImmeubleForm from './pages/immeubles/ImmeubleForm';

// NotFound page - créons un composant simple
import NotFound from './pages/NotFound';

// Composants d'authentification
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Créer un thème avec le mode sombre/clair
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Routes publiques */}
              <Route path="/login" element={<Login />} />

              {/* Routes privées - Dashboard */}
              <Route 
                path="/" 
                element={
                  <PrivateRoute>
                    <Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />
                  </PrivateRoute>
                }
              >
                <Route index element={<Home />} />
                
                {/* Routes Immeubles */}
                <Route path="immeubles" element={<ImmeublesList />} />
                <Route path="immeubles/new" element={<ImmeubleForm />} />
                <Route path="immeubles/:id" element={<ImmeubleDetails />} />
                <Route path="immeubles/:id/edit" element={<ImmeubleForm />} />
                
                {/* Les autres routes seront implémentées ultérieurement 
                
                <Route path="appartements" element={<AppartementsList />} />
                <Route path="appartements/new" element={<AppartementForm />} />
                <Route path="appartements/:id" element={<AppartementDetails />} />
                <Route path="appartements/:id/edit" element={<AppartementForm />} />
                
                <Route path="locataires" element={<LocatairesList />} />
                <Route path="locataires/new" element={<LocataireForm />} />
                <Route path="locataires/:id" element={<LocataireDetails />} />
                <Route path="locataires/:id/edit" element={<LocataireForm />} />
                
                <Route path="contrats" element={<ContratsList />} />
                <Route path="contrats/new" element={<ContratForm />} />
                <Route path="contrats/:id" element={<ContratDetails />} />
                <Route path="contrats/:id/edit" element={<ContratForm />} />
                
                <Route path="paiements" element={<PaiementsList />} />
                <Route path="paiements/new" element={<PaiementForm />} />
                
                <Route path="incidents" element={<IncidentsList />} />
                <Route path="incidents/new" element={<IncidentForm />} />
                <Route path="incidents/:id" element={<IncidentDetails />} />
                <Route path="incidents/:id/edit" element={<IncidentForm />} />
                */}
              </Route>

              {/* Route 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;