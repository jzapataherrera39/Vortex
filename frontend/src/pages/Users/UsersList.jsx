import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper, Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Chip, Snackbar, Alert, CircularProgress
} from '@mui/material';
import userStore from '../../store/userStore';

export default function UsersList() {
  const { users, fetchUsers, toggleUserState } = userStore();
  const navigate = useNavigate();
  
  // Estados para el diálogo y la acción
  const [openDialog, setOpenDialog] = useState(false);
  const [userToToggle, setUserToToggle] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false); // Nuevo: Estado de carga

  // Estados para notificaciones (Snackbar)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' // 'success' | 'error'
  });

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleToggleClick = (user) => {
    setUserToToggle(user);
    setOpenDialog(true);
  };

  const handleToggleConfirm = async () => {
    if (userToToggle) {
      setLoadingAction(true); // 1. Iniciamos carga
      try {
        const newState = userToToggle.state === 'activo' ? 'inactivo' : 'activo';
        const result = await toggleUserState(userToToggle._id, newState);

        if (result) {
            // 2. Éxito
            setSnackbar({
                open: true,
                message: `Usuario ${userToToggle.nombre} ${newState === 'activo' ? 'activado' : 'inactivado'} correctamente.`,
                severity: 'success'
            });
        } else {
            throw new Error('Error en la operación');
        }
      } catch (error) {
        // 3. Error
        setSnackbar({
            open: true,
            message: 'Hubo un error al intentar cambiar el estado del usuario.',
            severity: 'error'
        });
      } finally {
        // 4. Limpieza
        setLoadingAction(false);
        setOpenDialog(false);
        setUserToToggle(null);
      }
    }
  };

  const handleCloseDialog = () => {
    if (!loadingAction) { // Evitar cerrar si está cargando
        setOpenDialog(false);
        setUserToToggle(null);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Paper sx={{ p: 3, margin: 'auto', maxWidth: 1200, mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" color="primary">
          Gestión de Usuarios
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/admin/users/create')}
        >
          + Crear Usuario
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Rol</strong></TableCell>
              <TableCell align="center"><strong>Estado</strong></TableCell>
              <TableCell align="center"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.length > 0 ? (
                users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.nombre} {user.apellido}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.rol}</TableCell>
                <TableCell align="center">
                  <Chip 
                    label={user.state}
                    color={user.state === 'activo' ? 'success' : 'error'}
                    size="small"
                    variant="outlined"
                    sx={{ textTransform: 'capitalize' }} // Estilo visual
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => navigate(`/admin/users/edit/${user._id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color={user.state === 'activo' ? 'error' : 'success'}
                    size="small"
                    onClick={() => handleToggleClick(user)}
                  >
                    {user.state === 'activo' ? 'Inactivar' : 'Activar'}
                  </Button>
                </TableCell>
              </TableRow>
            ))
            ) : (
                <TableRow>
                    <TableCell colSpan={5} align="center">No hay usuarios registrados</TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo de Confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar Cambio de Estado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Deseas cambiar el estado de <strong>{userToToggle?.nombre}</strong> a {userToToggle?.state === 'activo' ? 'Inactivo' : 'Activo'}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loadingAction}>Cancelar</Button>
          <Button 
            onClick={handleToggleConfirm} 
            color="primary" 
            autoFocus 
            variant="contained"
            disabled={loadingAction} // Deshabilitar durante carga
            startIcon={loadingAction ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loadingAction ? 'Procesando...' : 'Confirmar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notificaciones Toast/Snackbar */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}