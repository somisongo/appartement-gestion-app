import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Box,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

// Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SearchIcon from '@mui/icons-material/Search';

// API
import axios from 'axios';

function ImmeublesList() {
  const [immeubles, setImmeubles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [immeubleToDelete, setImmeubleToDelete] = useState(null);

  // Récupérer la liste des immeubles
  useEffect(() => {
    const fetchImmeubles = async () => {
      try {
        // Dans une vraie application, nous utiliserions l'API
        // const response = await axios.get('/api/immeubles');
        // setImmeubles(response.data);

        // Données simulées pour la démo
        setTimeout(() => {
          const mockImmeubles = [
            {
              id: 1,
              nom: 'Résidence Les Oliviers',
              adresse: '12 Rue des Lilas',
              ville: 'Paris',
              code_postal: '75001',
              pays: 'France',
              date_construction: '2005-06-15',
              superficie_totale: 2500,
              nb_appartements: 18,
            },
            {
              id: 2,
              nom: 'Domaine des Chênes',
              adresse: '45 Avenue Victor Hugo',
              ville: 'Lyon',
              code_postal: '69001',
              pays: 'France',
              date_construction: '2010-03-22',
              superficie_totale: 3200,
              nb_appartements: 24,
            },
            {
              id: 3,
              nom: 'Le Clos Fleuri',
              adresse: '8 Rue de la Paix',
              ville: 'Marseille',
              code_postal: '13001',
              pays: 'France',
              date_construction: '2008-09-10',
              superficie_totale: 1800,
              nb_appartements: 12,
            },
            {
              id: 4,
              nom: 'Villa Belvédère',
              adresse: '120 Boulevard du Littoral',
              ville: 'Nice',
              code_postal: '06000',
              pays: 'France',
              date_construction: '2015-05-18',
              superficie_totale: 4500,
              nb_appartements: 30,
            },
            {
              id: 5,
              nom: 'Les Jardins de Bacchus',
              adresse: '25 Rue du Vignoble',
              ville: 'Bordeaux',
              code_postal: '33000',
              pays: 'France',
              date_construction: '2012-11-30',
              superficie_totale: 2800,
              nb_appartements: 20,
            },
          ];
          setImmeubles(mockImmeubles);
          setLoading(false);
        }, 1000); // Simulation du délai réseau
      } catch (err) {
        console.error('Erreur lors de la récupération des immeubles:', err);
        setError('Impossible de charger la liste des immeubles. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };

    fetchImmeubles();
  }, []);

  // Filtrer les immeubles en fonction du terme de recherche
  const filteredImmeubles = immeubles.filter(
    (immeuble) =>
      immeuble.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      immeuble.adresse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      immeuble.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
      immeuble.code_postal.includes(searchTerm)
  );

  // Gérer la suppression d'un immeuble
  const handleDeleteClick = (immeuble) => {
    setImmeubleToDelete(immeuble);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Dans une vraie application, nous utiliserions l'API
      // await axios.delete(`/api/immeubles/${immeubleToDelete.id}`);
      
      // Simulation de la suppression
      setImmeubles(immeubles.filter((i) => i.id !== immeubleToDelete.id));
      setDeleteDialogOpen(false);
      setImmeubleToDelete(null);
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'immeuble:', err);
      setError('Impossible de supprimer l\'immeuble. Veuillez réessayer plus tard.');
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setImmeubleToDelete(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 3 }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
          Réessayer
        </Button>
      </Box>
    );
  }

  return (
    <div className="container">
      <div className="page-title">
        <Typography variant="h4" component="h1">
          Immeubles
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/immeubles/new"
        >
          Nouvel immeuble
        </Button>
      </div>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Rechercher un immeuble"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="textSecondary">
                {filteredImmeubles.length} {filteredImmeubles.length > 1 ? 'immeubles trouvés' : 'immeuble trouvé'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Ville</TableCell>
              <TableCell>Code Postal</TableCell>
              <TableCell>Appartements</TableCell>
              <TableCell>Date Construction</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredImmeubles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body1">Aucun immeuble trouvé</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredImmeubles.map((immeuble) => (
                <TableRow key={immeuble.id}>
                  <TableCell>{immeuble.nom}</TableCell>
                  <TableCell>{immeuble.adresse}</TableCell>
                  <TableCell>{immeuble.ville}</TableCell>
                  <TableCell>{immeuble.code_postal}</TableCell>
                  <TableCell>
                    <Chip
                      icon={<ApartmentIcon />}
                      label={`${immeuble.nb_appartements} appartements`}
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(immeuble.date_construction).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      component={Link}
                      to={`/immeubles/${immeuble.id}`}
                      title="Voir les détails"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      component={Link}
                      to={`/immeubles/${immeuble.id}/edit`}
                      title="Modifier"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(immeuble)}
                      title="Supprimer"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialogue de confirmation de suppression */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmation de suppression"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir supprimer l'immeuble "{immeubleToDelete?.nom}" ?
            <br />
            Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ImmeublesList;