import { useEffect, useState } from "react";
import userStore from "../../store/userStore";

export default function UsersList() {
  const { token, getUsers, toggleUserState } = userStore();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const res = await getUsers(token);
      setUsers(res);
    }
    if (token) loadUsers();
  }, [token, getUsers]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>

      {users.map((u) => (
        <div key={u._id} className="border p-3 rounded mb-3 flex justify-between items-center">
          <div>
            <h3 className="font-bold">{u.nombre}</h3>
            <p>{u.email}</p>
            <p>Estado: {u.state}</p>
          </div>

          <div className="flex gap-2">
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded"
              onClick={() => alert("Función de editar usuario pendiente")}
            >
              Editar
            </button>

            <button
              className={`px-3 py-1 rounded ${u.state === 'activo' ? 'bg-red-500' : 'bg-green-500'} text-white`}
              onClick={() => toggleUserState(u._id)}
            >
              {u.state === 'activo' ? 'Inactivar' : 'Activar'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
