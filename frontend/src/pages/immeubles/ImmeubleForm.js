import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Box,
  CircularProgress,
  Breadcrumbs,
  Alert,
  Container,
  Card,
  CardContent,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import * as yup from 'yup';
import dayjs from 'dayjs';

// Icons
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// API
import axios from 'axios';

// Schéma de validation
const validationSchema = yup.object({
  nom: yup
    .string()
    .required('Le nom est requis')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  adresse: yup
    .string()
    .required('L\'adresse est requise')
    .max(255, 'L\'adresse ne peut pas dépasser 255 caractères'),
  ville: yup
    .string()
    .required('La ville est requise')
    .max(100, 'La ville ne peut pas dépasser 100 caractères'),
  code_postal: yup
    .string()
    .required('Le code postal est requis')
    .max(20, 'Le code postal ne peut pas dépasser 20 caractères'),
  pays: yup
    .string()
    .required('Le pays est requis')
    .max(50, 'Le pays ne peut pas dépasser 50 caractères'),
  date_construction: yup
    .date()
    .nullable()
    .typeError('Veuillez entrer une date valide'),
  superficie_totale: yup
    .number()
    .nullable()
    .typeError('Veuillez entrer un nombre valide')
    .positive('La superficie doit être positive'),
  notes: yup
    .string()
    .nullable()
    .max(1000, 'Les notes ne peuvent pas dépasser 1000 caractères'),
});

function ImmeubleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(id ? true : false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const isNewImmeuble = !id;

  // Initialisation du formulaire
  const formik = useFormik({
    initialValues: {
      nom: '',
      adresse: '',
      ville: '',
      code_postal: '',
      pays: 'France',
      date_construction: null,
      superficie_totale: '',
      notes: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);
        
        // Dans une vraie application, nous utiliserions l'API
        // const response = isNewImmeuble 
        //   ? await axios.post('/api/immeubles', values)
        //   : await axios.put(`/api/immeubles/${id}`, values);
        
        // Simulation de la création/modification
        setTimeout(() => {
          setLoading(false);
          setSuccess(isNewImmeuble 
            ? 'Immeuble créé avec succès !' 
            : 'Immeuble mis à jour avec succès !');
          
          // Rediriger vers la liste des immeubles après un court délai
          setTimeout(() => {
            navigate('/immeubles');
          }, 1500);
        }, 1000);
      } catch (err) {
        console.error('Erreur lors de l\'enregistrement de l\'immeuble:', err);
        setError('Impossible d\'enregistrer l\'immeuble. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    },
  });

  // Charger les données de l'immeuble si on est en mode édition
  useEffect(() => {
    if (id) {
      const fetchImmeuble = async () => {
        try {
          // Dans une vraie application, nous utiliserions l'API
          // const response = await axios.get(`/api/immeubles/${id}`);
          // const immeubleData = response.data;
          
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
            };
            
            formik.setValues({
              nom: mockImmeuble.nom,
              adresse: mockImmeuble.adresse,
              ville: mockImmeuble.ville,
              code_postal: mockImmeuble.code_postal,
              pays: mockImmeuble.pays,
              date_construction: mockImmeuble.date_construction ? dayjs(mockImmeuble.date_construction) : null,
              superficie_totale: mockImmeuble.superficie_totale || '',
              notes: mockImmeuble.notes || '',
            });
            
            setLoading(false);
          }, 1000);
        } catch (err) {
          console.error('Erreur lors de la récupération de l\'immeuble:', err);
          setError('Impossible de charger les données de l\'immeuble. Veuillez réessayer plus tard.');
          setLoading(false);
        }
      };

      fetchImmeuble();
    }
  }, [id, formik]);

  if (loading && id) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
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
          {isNewImmeuble ? 'Nouvel immeuble' : 'Modifier immeuble'}
        </Typography>
      </Breadcrumbs>

      <div className="page-title">
        <Typography variant="h4" component="h1">
          {isNewImmeuble ? 'Ajouter un nouvel immeuble' : 'Modifier l\'immeuble'}
        </Typography>
      </div>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <Container maxWidth="md" className="form-container">
        <Card>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Informations générales
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="nom"
                    name="nom"
                    label="Nom de l'immeuble"
                    value={formik.values.nom}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.nom && Boolean(formik.errors.nom)}
                    helperText={formik.touched.nom && formik.errors.nom}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="adresse"
                    name="adresse"
                    label="Adresse"
                    value={formik.values.adresse}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.adresse && Boolean(formik.errors.adresse)}
                    helperText={formik.touched.adresse && formik.errors.adresse}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="ville"
                    name="ville"
                    label="Ville"
                    value={formik.values.ville}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.ville && Boolean(formik.errors.ville)}
                    helperText={formik.touched.ville && formik.errors.ville}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="code_postal"
                    name="code_postal"
                    label="Code postal"
                    value={formik.values.code_postal}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.code_postal && Boolean(formik.errors.code_postal)}
                    helperText={formik.touched.code_postal && formik.errors.code_postal}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="pays"
                    name="pays"
                    label="Pays"
                    value={formik.values.pays}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.pays && Boolean(formik.errors.pays)}
                    helperText={formik.touched.pays && formik.errors.pays}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Détails supplémentaires
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date de construction"
                      value={formik.values.date_construction}
                      onChange={(value) => {
                        formik.setFieldValue('date_construction', value);
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          id: "date_construction",
                          name: "date_construction",
                          error: formik.touched.date_construction && Boolean(formik.errors.date_construction),
                          helperText: formik.touched.date_construction && formik.errors.date_construction
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="superficie_totale"
                    name="superficie_totale"
                    label="Superficie totale (m²)"
                    type="number"
                    value={formik.values.superficie_totale}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.superficie_totale && Boolean(formik.errors.superficie_totale)}
                    helperText={formik.touched.superficie_totale && formik.errors.superficie_totale}
                    InputProps={{
                      endAdornment: <Typography variant="body2">m²</Typography>,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="notes"
                    name="notes"
                    label="Notes"
                    multiline
                    rows={4}
                    value={formik.values.notes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.notes && Boolean(formik.errors.notes)}
                    helperText={formik.touched.notes && formik.errors.notes}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<ArrowBackIcon />}
                      component={Link}
                      to="/immeubles"
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={24} />
                      ) : (
                        isNewImmeuble ? 'Créer' : 'Mettre à jour'
                      )}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default ImmeubleForm;