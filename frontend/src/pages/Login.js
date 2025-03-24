import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Si l'utilisateur est déjà connecté, rediriger vers la page d'accueil
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation simple
    if (!email) {
      setError('Veuillez entrer votre email');
      return;
    }
    
    if (!password) {
      setError('Veuillez entrer votre mot de passe');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      // En mode démo, nous simulons la connexion
      // Dans une vraie application, nous utiliserions la fonction login du contexte d'authentification
      // await login(email, password);
      
      // Simulation de la connexion pour la démo
      setTimeout(() => {
        // Simulation de l'échec de connexion avec un email spécifique pour tester
        if (email === 'erreur@test.com') {
          setError('Email ou mot de passe incorrect');
          setLoading(false);
          return;
        }
        
        // Simuler la connexion réussie
        localStorage.setItem('token', 'fake-token-for-demo');
        localStorage.setItem('user', JSON.stringify({ name: 'Admin Demo', email }));
        window.location.href = '/'; // Forcer le rechargement pour que le contexte d'authentification prenne en compte le nouveau token
      }, 1500); // Délai pour simuler l'appel à l'API
      
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError('Échec de la connexion. Veuillez vérifier vos informations.');
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%', mt: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Connexion
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                {error}
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adresse email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Se connecter'}
              </Button>
            </Box>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" align="center">
                Pour la démo, utilisez n'importe quel email et mot de passe.
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                (Utilisez erreur@test.com pour tester l'erreur de connexion)
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;