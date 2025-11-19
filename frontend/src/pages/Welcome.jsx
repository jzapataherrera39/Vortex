import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Bienvenido a Vortex</h1>
      <p>Elige una opción:</p>

      <ul>
        <li><Link to="/pools">Gestionar Piscinas</Link></li>
        <li><Link to="/users">Gestionar Usuarios</Link></li>
      </ul>
    </div>
  );
}
