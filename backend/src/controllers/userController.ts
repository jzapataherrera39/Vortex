import { Request, Response } from 'express';
import User from '../models/User';

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).select('-contraseña');
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

// @desc    Update user state (activate/deactivate)
// @route   PUT /api/users/:id/state
// @access  Private/Admin
const setUserState = async (req: Request, res: Response) => {
  try {
    const { state } = req.body;

    if (!['activo', 'inactivo'].includes(state)) {
      return res.status(400).json({ message: 'El estado debe ser "activo" o "inactivo"' });
    }

    const user = await User.findById(req.params.id);

    if (user) {
      user.state = state;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        nombre: updatedUser.nombre,
        email: updatedUser.email,
        rol: updatedUser.rol,
        state: updatedUser.state,
      });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

export { getUsers, setUserState };
