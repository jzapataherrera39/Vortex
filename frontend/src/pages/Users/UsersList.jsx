import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Chip,
} from '@mui/material';
import userStore from '../../store/userStore';

export default function UsersList() {
  const { users, fetchUsers, toggleUserState } = userStore();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [userToToggle, setUserToToggle] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleToggleClick = (user) => {
    setUserToToggle(user);
    setOpenDialog(true);
  };

  const handleToggleConfirm = async () => {
    if (userToToggle) {
      const newState = userToToggle.state === 'activo' ? 'inactivo' : 'activo';
      await toggleUserState(userToToggle._id, newState);
      setOpenDialog(false);
      setUserToToggle(null);
      fetchUsers(); // Recargar usuarios
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUserToToggle(null);
  };

  return (
    <Paper sx={{ p: 3, margin: 'auto', maxWidth: 1200 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Panel de Usuarios
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell component="th" scope="row">{user.nombre}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.rol}</TableCell>
                <TableCell align="center">
                  <Chip 
                    label={user.state}
                    color={user.state === 'activo' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => navigate(`/admin/users/edit/${user._id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color={user.state === 'activo' ? 'error' : 'success'}
                    size="small"
                    onClick={() => handleToggleClick(user)}
                  >
                    {user.state === 'activo' ? 'Inactivar' : 'Activar'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirmar Cambio de Estado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas cambiar el estado de este usuario a {userToToggle?.state === 'activo' ? 'inactivo' : 'activo'}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleToggleConfirm} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
