import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

/**
 * Composant pour protéger les routes qui nécessitent une authentification
 * Si l'utilisateur n'est pas connecté, il est redirigé vers la page de connexion
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {React.ReactNode} props.children - Les composants enfants à afficher si l'utilisateur est authentifié
 * @returns {React.ReactNode} Les enfants ou une redirection vers la page de connexion
 */
function PrivateRoute({ children }) {
  const { currentUser, isAuthenticated } = useAuth();

  // Si l'état d'authentification est en cours de chargement, afficher un spinner
  if (currentUser === undefined) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si l'utilisateur est authentifié, afficher les enfants
  return children;
}

export default PrivateRoute;