import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Typography,
  Button,
  Grid,
  Paper,
  Box,
  CircularProgress,
  Breadcrumbs,
  Divider,
  Chip,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import WarningIcon from '@mui/icons-material/Warning';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

// API
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function ImmeubleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [immeuble, setImmeuble] = useState(null);
  const [appartements, setAppartements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Récupérer les données de l'immeuble et ses appartements
  useEffect(() => {
    const fetchImmeuble = async () => {
      try {
        // Dans une vraie application, nous utiliserions l'API
        // const immeubleResponse = await axios.get(`/api/immeubles/${id}`);
        // const appartementsResponse = await axios.get(`/api/immeubles/${id}/appartements`);
        // setImmeuble(immeubleResponse.data);
        // setAppartements(appartementsResponse.data);
        
        // Données simulées pour la démo
        setTimeout(() => {
          const mockImmeuble = {
            id: parseInt(id),
            nom: 'Résidence Les Oliviers',
            adresse: '12 Rue des Lilas',
            ville: 'Paris',
            code_postal: '75001',
            pays: 'France',
            date_construction: '2005-06-15',
            superficie_totale: 2500,
            notes: 'Immeuble de standing dans un quartier calme.',
            nb_appartements: 18,
            nb_appartements_occupes: 15,
            nb_appartements_disponibles: 2,
            nb_appartements_travaux: 1,
            loyer_potentiel_mensuel: 22000,
            loyer_reel_mensuel: 18500,
          };
          
          const mockAppartements = [
            {
              id: 101,
              numero: 'A101',
              etage: 'RDC',
              superficie: 65,
              nombre_pieces: 3,
              loyer: 900,
              charges: 150,
              statut: 'occupé',
              locataire: 'Martin Dupont',
              contrat_id: 201,
            },
            {
              id: 102,
              numero: 'A102',
              etage: 'RDC',
              superficie: 45,
              nombre_pieces: 2,
              loyer: 750,
              charges: 120,
              statut: 'occupé',
              locataire: 'Sophie Moreau',
              contrat_id: 202,
            },
            {
              id: 103,
              numero: 'A103',
              etage: 'RDC',
              superficie: 80,
              nombre_pieces: 4,
              loyer: 1200,
              charges: 200,
              statut: 'disponible',
              locataire: null,
              contrat_id: null,
            },
            {
              id: 201,
              numero: 'A201',
              etage: '1',
              superficie: 70,
              nombre_pieces: 3,
              loyer: 950,
              charges: 160,
              statut: 'occupé',
              locataire: 'Jean Martin',
              contrat_id: 203,
            },
            {
              id: 202,
              numero: 'A202',
              etage: '1',
              superficie: 50,
              nombre_pieces: 2,
              loyer: 800,
              charges: 130,
              statut: 'en travaux',
              locataire: null,
              contrat_id: null,
            },
          ];
          
          setImmeuble(mockImmeuble);
          setAppartements(mockAppartements);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        setError('Impossible de charger les données de l\'immeuble. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };

    fetchImmeuble();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Dans une vraie application, nous utiliserions l'API
      // await axios.delete(`/api/immeubles/${id}`);
      
      // Redirection après suppression
      setDeleteDialogOpen(false);
      navigate('/immeubles');
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'immeuble:', err);
      setError('Impossible de supprimer l\'immeuble. Veuillez réessayer plus tard.');
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
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
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Accueil
        </Link>
        <Link to="/immeubles" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <ApartmentIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Immeubles
        </Link>
        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
          {immeuble.nom}
        </Typography>
      </Breadcrumbs>

      <div className="page-title">
        <Typography variant="h4" component="h1">
          {immeuble.nom}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<EditIcon />}
            component={Link}
            to={`/immeubles/${id}/edit`}
            sx={{ mr: 1 }}
          >
            Modifier
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteClick}
          >
            Supprimer
          </Button>
        </Box>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Informations générales
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  {immeuble.adresse}, {immeuble.code_postal} {immeuble.ville}, {immeuble.pays}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EventIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  Date de construction: {new Date(immeuble.date_construction).toLocaleDateString()}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SquareFootIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  Superficie totale: {immeuble.superficie_totale} m²
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ApartmentIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  Nombre d'appartements: {immeuble.nb_appartements}
                </Typography>
              </Box>
              
              {immeuble.notes && (
                <>
                  <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    Notes
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {immeuble.notes}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Statistiques
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 1 }}>
                    <Typography variant="h3" color="primary">
                      {immeuble.nb_appartements}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Appartements
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 1 }}>
                    <Typography variant="h3" color="success.main">
                      {immeuble.nb_appartements_occupes}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Occupés
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 1 }}>
                    <Typography variant="h3" color="info.main">
                      {immeuble.nb_appartements_disponibles}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Disponibles
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 1 }}>
                    <Typography variant="h3" color="warning.main">
                      {immeuble.nb_appartements_travaux}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      En travaux
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AttachMoneyIcon color="primary" sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="body1">
                        Loyer potentiel mensuel
                      </Typography>
                      <Typography variant="h6">
                        {immeuble.loyer_potentiel_mensuel} €
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AttachMoneyIcon color="success" sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="body1">
                        Loyer réel mensuel
                      </Typography>
                      <Typography variant="h6">
                        {immeuble.loyer_reel_mensuel} €
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          
          <Box sx={{ width: '100%', mt: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="Onglets de l'immeuble">
                <Tab label="Appartements" icon={<MeetingRoomIcon />} iconPosition="start" {...a11yProps(0)} />
                <Tab label="Locataires" icon={<PersonIcon />} iconPosition="start" {...a11yProps(1)} />
                <Tab label="Incidents" icon={<WarningIcon />} iconPosition="start" {...a11yProps(2)} />
              </Tabs>
            </Box>
            
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Liste des appartements</Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<AddIcon />}
                  component={Link}
                  to={`/appartements/new?immeuble=${id}`}
                >
                  Ajouter un appartement
                </Button>
              </Box>
              
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Numéro</TableCell>
                      <TableCell>Étage</TableCell>
                      <TableCell>Superficie</TableCell>
                      <TableCell>Pièces</TableCell>
                      <TableCell>Loyer</TableCell>
                      <TableCell>Statut</TableCell>
                      <TableCell>Locataire</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appartements.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} align="center">
                          <Typography>Aucun appartement trouvé</Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      appartements.map((appartement) => (
                        <TableRow key={appartement.id}>
                          <TableCell>{appartement.numero}</TableCell>
                          <TableCell>{appartement.etage}</TableCell>
                          <TableCell>{appartement.superficie} m²</TableCell>
                          <TableCell>{appartement.nombre_pieces}</TableCell>
                          <TableCell>{appartement.loyer} €</TableCell>
                          <TableCell>
                            <Chip 
                              label={appartement.statut}
                              className={`status-badge status-${appartement.statut}`}
                            />
                          </TableCell>
                          <TableCell>
                            {appartement.locataire ? (
                              <Link to={`/locataires/${appartement.locataire_id}`}>
                                {appartement.locataire}
                              </Link>
                            ) : (
                              '—'
                            )}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              color="primary"
                              component={Link}
                              to={`/appartements/${appartement.id}`}
                              title="Voir les détails"
                            >
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              component={Link}
                              to={`/appartements/${appartement.id}/edit`}
                              title="Modifier"
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>
                Locataires de l'immeuble
              </Typography>
              <Typography variant="body1">
                Cette section affichera la liste des locataires de l'immeuble.
              </Typography>
            </TabPanel>
            
            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" gutterBottom>
                Incidents signalés
              </Typography>
              <Typography variant="body1">
                Cette section affichera la liste des incidents signalés dans l'immeuble.
              </Typography>
            </TabPanel>
          </Box>
        </Grid>
      </Grid>

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
            Êtes-vous sûr de vouloir supprimer l'immeuble "{immeuble.nom}" ?
            <br />
            Cette action supprimera également tous les appartements associés et est irréversible.
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

export default ImmeubleDetails;