import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Chip
} from '@mui/material';
import API from '../services/api';

const UsersListPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const { data } = await API.get('/users');
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar los usuarios');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleState = async (id, currentState) => {
    const newState = currentState === 'activo' ? 'inactivo' : 'activo';
    try {
      await API.put(`/users/${id}/state`, { state: newState });
      fetchUsers(); // Refresh the list
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cambiar el estado del usuario');
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Usuarios
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.nombre}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                    <Chip label={user.rol} color={user.rol === 'ADMIN' ? 'primary' : 'default'} />
                </TableCell>
                <TableCell>
                    <Chip label={user.state} color={user.state === 'activo' ? 'success' : 'error'} />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleToggleState(user._id, user.state)}
                  >
                    {user.state === 'activo' ? 'Desactivar' : 'Activar'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UsersListPage;
