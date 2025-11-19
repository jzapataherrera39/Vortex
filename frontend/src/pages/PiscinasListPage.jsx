import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, Fab } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import API from '../services/api';
import useAuthStore from '../store/authStore';

const PiscinasListPage = () => {
  const [piscinas, setPiscinas] = useState([]);
  const [error, setError] = useState('');
  const { user } = useAuthStore();

  const fetchPiscinas = async () => {
    try {
      const { data } = await API.get('/piscinas');
      setPiscinas(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar las piscinas');
    }
  };

  useEffect(() => {
    fetchPiscinas();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta piscina?')) {
        try {
            await API.delete(`/piscinas/${id}`);
            fetchPiscinas(); // Refresh the list
        } catch (err) {
            setError(err.response?.data?.message || 'Error al eliminar la piscina');
        }
    }
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Piscinas
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={4}>
        {piscinas.map((piscina) => (
          <Grid item key={piscina._id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={piscina.foto}
                alt={piscina.nombre}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {piscina.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {piscina.ciudad}, {piscina.municipio}
                </Typography>
                 <Typography variant="body2" color="text.secondary">
                  {piscina.ancho}m x {piscina.altura}m | {piscina.forma}
                </Typography>
              </CardContent>
              {user?.rol === 'ADMIN' && (
                <CardActions>
                  <Button size="small" component={Link} to={`/piscinas/editar/${piscina._id}`}>Editar</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(piscina._id)}>Eliminar</Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      {user?.rol === 'ADMIN' && (
        <Fab
          color="primary"
          aria-label="add"
          component={Link}
          to="/piscinas/crear"
          sx={{ position: 'fixed', bottom: 32, right: 32 }}
        >
          <AddIcon />
        </Fab>
      )}
    </Container>
  );
};

export default PiscinasListPage;
