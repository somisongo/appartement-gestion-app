import React, { createContext, useState, useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';

// Création du contexte
const SnackbarContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

// Fournisseur du contexte
export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info'); // 'error', 'warning', 'info', 'success'
  const [duration, setDuration] = useState(6000);

  // Fonction pour ouvrir le snackbar
  const showSnackbar = (newMessage, newSeverity = 'info', newDuration = 6000) => {
    setMessage(newMessage);
    setSeverity(newSeverity);
    setDuration(newDuration);
    setOpen(true);
  };

  // Fonction pour fermer le snackbar
  const hideSnackbar = () => {
    setOpen(false);
  };

  // Fonctions utilitaires pour les différents types de snackbar
  const showSuccessSnackbar = (msg, dur) => showSnackbar(msg, 'success', dur);
  const showErrorSnackbar = (msg, dur) => showSnackbar(msg, 'error', dur);
  const showWarningSnackbar = (msg, dur) => showSnackbar(msg, 'warning', dur);
  const showInfoSnackbar = (msg, dur) => showSnackbar(msg, 'info', dur);

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
        showSuccessSnackbar,
        showErrorSnackbar,
        showWarningSnackbar,
        showInfoSnackbar,
        hideSnackbar,
      }}
    >
      {children}
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={hideSnackbar} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;