import { Request, Response } from 'express';
import User from '../models/User';


const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};


const createUser = async (req: Request, res: Response) => {
    try {
        const { nombre, apellido, cedula, email, password, rol } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const user = await User.create({
            nombre,
            apellido,
            cedula,
            email,
            password, 
            rol,
            state: 'activo'
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
            });
        } else {
            res.status(400).json({ message: 'Datos de usuario inválidos' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.nombre = req.body.nombre || user.nombre;
            user.apellido = req.body.apellido || user.apellido;
            user.cedula = req.body.cedula || user.cedula;
            user.email = req.body.email || user.email;
            user.rol = req.body.rol || user.rol;
            

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                nombre: updatedUser.nombre,
                email: updatedUser.email,
                rol: updatedUser.rol,
            });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};


const toggleUserStatus = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {

            user.state = req.body.state || (user.state === 'activo' ? 'inactivo' : 'activo');
            
            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};
const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.deleteOne(); 
            res.json({ message: 'Usuario eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

export { getUsers, createUser, getUserById, updateUser, toggleUserStatus, deleteUser };