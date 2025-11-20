
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import poolStore from '../../store/poolStore';
import useAuthStore from '../../store/authStore';

export default function PoolList() {
  const { pools, fetchPools, deletePool } = poolStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [poolToDelete, setPoolToDelete] = useState(null);

  useEffect(() => {
    fetchPools();
  }, [fetchPools]);

  const handleDeleteClick = (id) => {
    setPoolToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (poolToDelete) {
      await deletePool(poolToDelete);
      setOpenDeleteDialog(false);
      setPoolToDelete(null);
      fetchPools(); // Recargar piscinas después de eliminar
    }
  };

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
    setPoolToDelete(null);
  };

  return (
    <Paper sx={{ p: 3, margin: 'auto', maxWidth: 1200 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Panel de Piscinas
        </Typography>
        {user?.rol === 'ADMIN' && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/pools/create')}
          >
            Crear Nueva Piscina
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Tipo</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Capacidad (L)</TableCell>
              {user?.rol === 'ADMIN' && <TableCell align="center">Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {pools.map((pool) => (
              <TableRow
                key={pool._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {pool.nombre}
                </TableCell>
                <TableCell align="right">{pool.tipo}</TableCell>
                <TableCell align="right">{pool.estado}</TableCell>
                <TableCell align="right">{pool.capacidad}</TableCell>
                {user?.rol === 'ADMIN' && (
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => navigate(`/pools/edit/${pool._id}`)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClick(pool._id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog for Deletion */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar esta piscina? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
