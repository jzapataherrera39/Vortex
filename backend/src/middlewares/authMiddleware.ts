import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
         token = req.headers.authorization.split(' ')[1];

         const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

          req.user = await User.findById(decoded.id).select('-contraseña');

      if (!req.user) {
        return res.status(401).json({ message: 'No autorizado, usuario no encontrado' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'No autorizado, token fallido' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No autorizado, no hay token' });
  }
};

const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.rol === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: 'No autorizado como administrador' });
  }
};

export { protect, admin };
