import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import AppartementsList from './pages/appartements/AppartementsList';
import AppartementDetails from './pages/appartements/AppartementDetails';
import AppartementForm from './pages/appartements/AppartementForm';
import LocatairesList from './pages/locataires/LocatairesList';
import LocataireDetails from './pages/locataires/LocataireDetails';
import LocataireForm from './pages/locataires/LocataireForm';
import ContratsList from './pages/contrats/ContratsList';
import ContratDetails from './pages/contrats/ContratDetails';
import ContratForm from './pages/contrats/ContratForm';
import PaiementsList from './pages/paiements/PaiementsList';
import PaiementForm from './pages/paiements/PaiementForm';
import IncidentsList from './pages/incidents/IncidentsList';
import IncidentDetails from './pages/incidents/IncidentDetails';
import IncidentForm from './pages/incidents/IncidentForm';
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
                
                {/* Routes Appartements */}
                <Route path="appartements" element={<AppartementsList />} />
                <Route path="appartements/new" element={<AppartementForm />} />
                <Route path="appartements/:id" element={<AppartementDetails />} />
                <Route path="appartements/:id/edit" element={<AppartementForm />} />
                
                {/* Routes Locataires */}
                <Route path="locataires" element={<LocatairesList />} />
                <Route path="locataires/new" element={<LocataireForm />} />
                <Route path="locataires/:id" element={<LocataireDetails />} />
                <Route path="locataires/:id/edit" element={<LocataireForm />} />
                
                {/* Routes Contrats */}
                <Route path="contrats" element={<ContratsList />} />
                <Route path="contrats/new" element={<ContratForm />} />
                <Route path="contrats/:id" element={<ContratDetails />} />
                <Route path="contrats/:id/edit" element={<ContratForm />} />
                
                {/* Routes Paiements */}
                <Route path="paiements" element={<PaiementsList />} />
                <Route path="paiements/new" element={<PaiementForm />} />
                
                {/* Routes Incidents */}
                <Route path="incidents" element={<IncidentsList />} />
                <Route path="incidents/new" element={<IncidentForm />} />
                <Route path="incidents/:id" element={<IncidentDetails />} />
                <Route path="incidents/:id/edit" element={<IncidentForm />} />
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