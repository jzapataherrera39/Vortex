import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  nombre: string;
  apellido?: string;
  cedula: string;
  email: string;
  state: 'activo' | 'inactivo';
  password: string;
  rol: 'ADMIN' | 'USER';
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    nombre: { type: String, required: true },
    apellido: { type: String },
    cedula: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    state: { type: String, enum: ['activo', 'inactivo'], default: 'activo' },
    password: { type: String, required: true },
    rol: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
  },
  {
    timestamps: true,
  }
);

// Método para comparar contraseñas
UserSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encriptar password antes de guardar
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

export default mongoose.model<IUser>('User', UserSchema);
