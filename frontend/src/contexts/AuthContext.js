import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Initialiser l'état utilisateur à partir du token stocké
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    
    if (storedToken) {
      try {
        // Vérifier si le token est expiré
        const decodedToken = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;
        
        if (decodedToken.exp > currentTime) {
          // Token valide, configurer axios et définir l'utilisateur
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          setCurrentUser(decodedToken.user);
          setToken(storedToken);
        } else {
          // Token expiré
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du token:', error);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      }
    }
    
    setLoading(false);
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      // Dans une vraie application, nous utiliserions l'API
      // const response = await axios.post('/api/auth/login', { email, password });
      
      // Simulation pour la démo
      // Simulation d'un délai pour l'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Créer un faux token et un utilisateur
      const fakeUser = {
        id: 1,
        name: email.split('@')[0],
        email: email,
        role: 'admin'
      };
      
      const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY4MzAzMTkwOCwiZXhwIjoxNzE0NTY3OTA4fQ.Pd9WxMj_1JjYtXTMX1C9_OAQSjqYRWJ2OVFpDLUHI0Y';
      
      localStorage.setItem('token', fakeToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${fakeToken}`;
      
      setCurrentUser(fakeUser);
      setToken(fakeToken);
      
      return fakeUser;
    } catch (error) {
      throw error;
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
    setToken(null);
  };

  const value = {
    currentUser,
    token,
    login,
    logout,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}