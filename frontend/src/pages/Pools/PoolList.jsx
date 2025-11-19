import { useEffect } from "react";
import { Link } from "react-router-dom";
import poolStore from "../../store/poolStore";

export default function PoolsList() {
  const { pools, fetchPools, deletePool } = poolStore();

  useEffect(() => {
    fetchPools();
  }, [fetchPools]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Piscinas</h2>

      <Link to="/pools/create">Crear Piscina</Link>

      <ul>
        {pools.map(pool => (
          <li key={pool._id}>
            {pool.nombre} — {pool.estado}

            <Link to={`/pools/edit/${pool._id}`} style={{ marginLeft: 10 }}>
              Editar
            </Link>

            <button onClick={() => deletePool(pool._id)} style={{ marginLeft: 10 }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
