import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardActions,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Icons
import ApartmentIcon from '@mui/icons-material/Apartment';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import WarningIcon from '@mui/icons-material/Warning';
import SummarizeIcon from '@mui/icons-material/Summarize';

// Charts
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';

// API
import axios from 'axios';

ChartJS.register(ArcElement, ChartTooltip, Legend);

const StatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  height: 200,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

function Home() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    immeubles: 0,
    appartements: 0,
    locataires: 0,
    contrats: 0,
    paiements: 0,
    incidents: 0,
  });
  
  const [appartementData, setAppartementData] = useState({
    labels: ['Disponible', 'Occupé', 'En travaux'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#1976d2', '#2e7d32', '#f57c00'],
      },
    ],
  });
  
  const [paiementData, setPaiementData] = useState({
    labels: ['Reçu', 'En attente', 'Retard'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#2e7d32', '#7b1fa2', '#d32f2f'],
      },
    ],
  });
  
  const [recentIncidents, setRecentIncidents] = useState([]);
  const [paiementsRecents, setPaiementsRecents] = useState([]);

  // Simuler la récupération des données
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dans une vraie application, ces appels seraient remplacés par des appels à l'API
        /*
        const statsResponse = await axios.get('/api/stats');
        const incidentsResponse = await axios.get('/api/incidents/recent');
        const paiementsResponse = await axios.get('/api/paiements/recent');
        
        setStats(statsResponse.data);
        setRecentIncidents(incidentsResponse.data);
        setPaiementsRecents(paiementsResponse.data);
        
        // Mise à jour des données pour les graphiques
        setAppartementData({
          ...appartementData,
          datasets: [{
            ...appartementData.datasets[0],
            data: [
              statsResponse.data.appartements_disponibles,
              statsResponse.data.appartements_occupes,
              statsResponse.data.appartements_travaux,
            ],
          }],
        });
        
        setPaiementData({
          ...paiementData,
          datasets: [{
            ...paiementData.datasets[0],
            data: [
              statsResponse.data.paiements_recus,
              statsResponse.data.paiements_attente,
              statsResponse.data.paiements_retard,
            ],
          }],
        });
        */
        
        // Données fictives pour la démo
        setStats({
          immeubles: 5,
          appartements: 28,
          locataires: 22,
          contrats: 24,
          paiements: 120,
          incidents: 8,
        });
        
        setAppartementData({
          ...appartementData,
          datasets: [{
            ...appartementData.datasets[0],
            data: [10, 16, 2],
          }],
        });
        
        setPaiementData({
          ...paiementData,
          datasets: [{
            ...paiementData.datasets[0],
            data: [90, 25, 5],
          }],
        });
        
        setRecentIncidents([
          { id: 1, appartement: 'Appt 101', description: 'Fuite d\'eau dans la salle de bain', priorite: 'Haute', date_signalement: '2023-12-10' },
          { id: 2, appartement: 'Appt 203', description: 'Problème de chauffage', priorite: 'Moyenne', date_signalement: '2023-12-08' },
          { id: 3, appartement: 'Appt 305', description: 'Serrure de porte défectueuse', priorite: 'Basse', date_signalement: '2023-12-05' },
        ]);
        
        setPaiementsRecents([
          { id: 1, locataire: 'Martin Dupont', montant: 750, date_paiement: '2023-12-01', statut: 'Reçu' },
          { id: 2, locataire: 'Sophie Moreau', montant: 950, date_paiement: '2023-12-03', statut: 'Reçu' },
          { id: 3, locataire: 'Jean Leroy', montant: 850, date_paiement: '2023-12-08', statut: 'En attente' },
        ]);
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="container">
      <div className="page-title">
        <Typography variant="h4" component="h1">
          Tableau de bord
        </Typography>
      </div>

      <Grid container spacing={3} className="dashboard-stats">
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatsCard>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Immeubles
              </Typography>
              <StatValue>{stats.immeubles}</StatValue>
              <ApartmentIcon color="primary" />
            </CardContent>
            <CardActions>
              <Button component={Link} to="/immeubles" size="small">
                Voir tous
              </Button>
            </CardActions>
          </StatsCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatsCard>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Appartements
              </Typography>
              <StatValue>{stats.appartements}</StatValue>
              <MeetingRoomIcon color="primary" />
            </CardContent>
            <CardActions>
              <Button component={Link} to="/appartements" size="small">
                Voir tous
              </Button>
            </CardActions>
          </StatsCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatsCard>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Locataires
              </Typography>
              <StatValue>{stats.locataires}</StatValue>
              <PersonIcon color="primary" />
            </CardContent>
            <CardActions>
              <Button component={Link} to="/locataires" size="small">
                Voir tous
              </Button>
            </CardActions>
          </StatsCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatsCard>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Contrats
              </Typography>
              <StatValue>{stats.contrats}</StatValue>
              <DescriptionIcon color="primary" />
            </CardContent>
            <CardActions>
              <Button component={Link} to="/contrats" size="small">
                Voir tous
              </Button>
            </CardActions>
          </StatsCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatsCard>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Paiements
              </Typography>
              <StatValue>{stats.paiements}</StatValue>
              <PaymentIcon color="primary" />
            </CardContent>
            <CardActions>
              <Button component={Link} to="/paiements" size="small">
                Voir tous
              </Button>
            </CardActions>
          </StatsCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatsCard>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Incidents
              </Typography>
              <StatValue>{stats.incidents}</StatValue>
              <WarningIcon color="primary" />
            </CardContent>
            <CardActions>
              <Button component={Link} to="/incidents" size="small">
                Voir tous
              </Button>
            </CardActions>
          </StatsCard>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Statut des Appartements
              </Typography>
              <ChartContainer>
                <Pie data={appartementData} options={{ responsive: true, maintainAspectRatio: false }} />
              </ChartContainer>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Statut des Paiements
              </Typography>
              <ChartContainer>
                <Doughnut data={paiementData} options={{ responsive: true, maintainAspectRatio: false }} />
              </ChartContainer>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Incidents Récents
              </Typography>
              <List>
                {recentIncidents.map((incident) => (
                  <React.Fragment key={incident.id}>
                    <ListItem>
                      <ListItemIcon>
                        <WarningIcon color={incident.priorite === 'Haute' ? 'error' : incident.priorite === 'Moyenne' ? 'warning' : 'info'} />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${incident.appartement} - ${incident.description}`}
                        secondary={`Priorité: ${incident.priorite} | Signalé le: ${incident.date_signalement}`}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
              <Box display="flex" justifyContent="flex-end" mt={1}>
                <Button component={Link} to="/incidents" size="small">
                  Voir tous
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Paiements Récents
              </Typography>
              <List>
                {paiementsRecents.map((paiement) => (
                  <React.Fragment key={paiement.id}>
                    <ListItem>
                      <ListItemIcon>
                        <PaymentIcon color={paiement.statut === 'Reçu' ? 'success' : paiement.statut === 'En attente' ? 'primary' : 'error'} />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${paiement.locataire}`}
                        secondary={`Montant: ${paiement.montant} € | Date: ${paiement.date_paiement} | Statut: ${paiement.statut}`}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
              <Box display="flex" justifyContent="flex-end" mt={1}>
                <Button component={Link} to="/paiements" size="small">
                  Voir tous
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Rapports
              </Typography>
              <List>
                <ListItem button component={Link} to="/rapports/occupation">
                  <ListItemIcon>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Rapport d'occupation"
                    secondary="Vue d'ensemble de l'occupation des appartements"
                  />
                </ListItem>
                <Divider />
                <ListItem button component={Link} to="/rapports/finance">
                  <ListItemIcon>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Rapport financier"
                    secondary="Résumé des revenus et dépenses"
                  />
                </ListItem>
                <Divider />
                <ListItem button component={Link} to="/rapports/maintenance">
                  <ListItemIcon>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Rapport de maintenance"
                    secondary="Incidents et réparations"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;