import useAuthStore from "../store/authStore";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, adminOnly }) {
  const { isAuthenticated, user, loading } = useAuthStore();

  if (loading) return <div>Cargando...</div>; // evita render prematuro

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (adminOnly && (!user || user.rol !== 'ADMIN')) return <Navigate to="/" />;

  return children;
}
