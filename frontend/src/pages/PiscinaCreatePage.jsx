import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, TextField, Button, Typography, Box, Alert, Grid, Select, MenuItem,
  FormControl, InputLabel, IconButton, Paper
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import API from '../services/api';

const PiscinaCreatePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    altura: '',
    ancho: '',
    ciudad: '',
    municipio: '',
    categoria: 'Adultos',
    forma: 'Rectangular',
    uso: 'Publica',
  });
  const [profundidades, setProfundidades] = useState(['']);
  const [bombas, setBombas] = useState([{ marca: '', referencia: '', potencia: '', material: 'Sumergible', foto: null, seRepite: 'no', totalBombas: '1' }]);
  const [files, setFiles] = useState({});
  const [error, setError] = useState('');

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(prev => ({ ...prev, [e.target.name]: e.target.files[0] }));
    }
  };

  const handleBombaChange = (index, field, value) => {
    const newBombas = [...bombas];
    newBombas[index][field] = value;
    setBombas(newBombas);
  };

  const handleBombaFileChange = (index, file) => {
    const newBombas = [...bombas];
    newBombas[index].foto = file;
    setBombas(newBombas);
  };

  const addBomba = () => setBombas([...bombas, { marca: '', referencia: '', potencia: '', material: 'Sumergible', foto: null, seRepite: 'no', totalBombas: '1' }]);
  const removeBomba = (index) => setBombas(bombas.filter((_, i) => i !== index));

  const handleProfundidadChange = (index, value) => {
    const newProfundidades = [...profundidades];
    newProfundidades[index] = value;
    setProfundidades(newProfundidades);
  };
  const addProfundidad = () => setProfundidades([...profundidades, '']);
  const removeProfundidad = (index) => setProfundidades(profundidades.filter((_, i) => i !== index));


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const submissionData = new FormData();
    
    // Append main form data
    Object.entries(formData).forEach(([key, value]) => submissionData.append(key, value));
    
    // Append files
    if (files.foto) submissionData.append('foto', files.foto);
    if (files.hojaSeguridad) submissionData.append('hojaSeguridad', files.hojaSeguridad);
    if (files.fichaTecnica) submissionData.append('fichaTecnica', files.fichaTecnica);

    // Append dynamic fields
    submissionData.append('profundidades', JSON.stringify(profundidades.map(Number)));

    bombas.forEach((bomba, index) => {
        submissionData.append(`bombas[${index}][marca]`, bomba.marca);
        submissionData.append(`bombas[${index}][referencia]`, bomba.referencia);
        submissionData.append(`bombas[${index}][potencia]`, bomba.potencia);
        submissionData.append(`bombas[${index}][material]`, bomba.material);
        submissionData.append(`bombas[${index}][seRepite]`, bomba.seRepite);
        submissionData.append(`bombas[${index}][totalBombas]`, bomba.totalBombas);
        if (bomba.foto) {
            submissionData.append(`bombas[${index}][foto]`, bomba.foto);
        }
    });

    try {
      await API.post('/piscinas', submissionData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/piscinas');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la piscina');
    }
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Crear Nueva Piscina</Typography>
        
        <Grid container spacing={3}>
            {/* Basic Info */}
            <Grid item xs={12} sm={6}><TextField name="nombre" label="Nombre" fullWidth required onChange={handleFormChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField name="direccion" label="Dirección" fullWidth required onChange={handleFormChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField name="ciudad" label="Ciudad" fullWidth required onChange={handleFormChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField name="municipio" label="Municipio" fullWidth required onChange={handleFormChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField name="ancho" label="Ancho (m)" type="number" fullWidth required onChange={handleFormChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField name="altura" label="Altura (m)" type="number" fullWidth required onChange={handleFormChange} /></Grid>

            {/* Selects */}
            <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Categoría</InputLabel><Select name="categoria" value={formData.categoria} label="Categoría" onChange={handleFormChange}><MenuItem value="Niños">Niños</MenuItem><MenuItem value="Adultos">Adultos</MenuItem></Select></FormControl></Grid>
            <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Forma</InputLabel><Select name="forma" value={formData.forma} label="Forma" onChange={handleFormChange}><MenuItem value="Rectangular">Rectangular</MenuItem><MenuItem value="Circular">Circular</MenuItem></Select></FormControl></Grid>
            <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Uso</InputLabel><Select name="uso" value={formData.uso} label="Uso" onChange={handleFormChange}><MenuItem value="Privada">Privada</MenuItem><MenuItem value="Publica">Publica</MenuItem></Select></FormControl></Grid>

            {/* File Inputs */}
            <Grid item xs={12} sm={4}><Button variant="contained" component="label" fullWidth>Foto Principal<input type="file" name="foto" hidden required onChange={handleFileChange} /></Button>{files.foto?.name}</Grid>
            <Grid item xs={12} sm={4}><Button variant="contained" component="label" fullWidth>Hoja de Seguridad (PDF)<input type="file" name="hojaSeguridad" hidden required onChange={handleFileChange} /></Button>{files.hojaSeguridad?.name}</Grid>
            <Grid item xs={12} sm={4}><Button variant="contained" component="label" fullWidth>Ficha Técnica (PDF)<input type="file" name="fichaTecnica" hidden required onChange={handleFileChange} /></Button>{files.fichaTecnica?.name}</Grid>

            {/* Profundidades */}
            <Grid item xs={12}><Typography variant="h6">Profundidades</Typography></Grid>
            {profundidades.map((p, i) => (
                <Grid item xs={12} sm={4} md={3} key={i} sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField label={`Profundidad ${i + 1}`} type="number" fullWidth value={p} onChange={e => handleProfundidadChange(i, e.target.value)} />
                    <IconButton onClick={() => removeProfundidad(i)}><RemoveCircleOutlineIcon /></IconButton>
                </Grid>
            ))}
            <Grid item xs={12}><Button startIcon={<AddCircleOutlineIcon />} onClick={addProfundidad}>Añadir Profundidad</Button></Grid>

            {/* Bombas */}
            <Grid item xs={12}><Typography variant="h6">Bombas</Typography></Grid>
            {bombas.map((bomba, index) => (
                <Grid item xs={12} key={index}>
                    <Paper sx={{ p: 2, mb: 2, border: '1px solid #ddd' }}>
                        <Typography variant="subtitle1">Bomba {index + 1}</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}><TextField label="Marca" fullWidth required value={bomba.marca} onChange={e => handleBombaChange(index, 'marca', e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField label="Referencia" fullWidth required value={bomba.referencia} onChange={e => handleBombaChange(index, 'referencia', e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField label="Potencia" fullWidth required value={bomba.potencia} onChange={e => handleBombaChange(index, 'potencia', e.target.value)} /></Grid>
                            <Grid item xs={6}><FormControl fullWidth><InputLabel>Material</InputLabel><Select value={bomba.material} label="Material" onChange={e => handleBombaChange(index, 'material', e.target.value)}><MenuItem value="Sumergible">Sumergible</MenuItem><MenuItem value="Centrifuga">Centrífuga</MenuItem></Select></FormControl></Grid>
                            <Grid item xs={12}><Button variant="outlined" component="label" fullWidth>Foto de la Bomba<input type="file" hidden required onChange={e => handleBombaFileChange(index, e.target.files ? e.target.files[0] : null)} /></Button>{bomba.foto?.name}</Grid>
                            <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>¿Repetir Bomba?</InputLabel><Select value={bomba.seRepite} label="¿Repetir Bomba?" onChange={e => handleBombaChange(index, 'seRepite', e.target.value)}><MenuItem value="no">No</MenuItem><MenuItem value="si">Sí</MenuItem></Select></FormControl></Grid>
                            {bomba.seRepite === 'si' && <Grid item xs={12} sm={6}><TextField label="Total de Bombas" type="number" fullWidth required={bomba.seRepite === 'si'} value={bomba.totalBombas} onChange={e => handleBombaChange(index, 'totalBombas', e.target.value)} /></Grid>}
                        </Grid>
                        <Button color="error" startIcon={<RemoveCircleOutlineIcon />} onClick={() => removeBomba(index)} sx={{mt: 1}}>Quitar Bomba</Button>
                    </Paper>
                </Grid>
            ))}
            <Grid item xs={12}><Button startIcon={<AddCircleOutlineIcon />} onClick={addBomba}>Añadir Bomba</Button></Grid>
        </Grid>

        {error && <Alert severity="error" sx={{ width: '100%', mt: 3 }}>{error}</Alert>}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 5 }}>Crear Piscina</Button>
      </Box>
    </Container>
  );
};

export default PiscinaCreatePage;
