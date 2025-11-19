import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import userStore from "../../store/userStore";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, getUsers, updateUser } = userStore();
  const [form, setForm] = useState({ nombre: "", email: "", rol: "USER" });

  useEffect(() => {
    async function loadUser() {
      const users = await getUsers(token);
      const user = users.find(u => u._id === id);
      if (user) setForm({ nombre: user.nombre, email: user.email, rol: user.rol });
    }
    if (token) loadUser();
  }, [id, token, getUsers]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await updateUser(id, form, token);
    navigate("/users");
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Editar Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nombre"
          value={form.nombre}
          placeholder="Nombre"
          className="border p-2 w-full"
          onChange={handleChange}
        />
        <input
          name="email"
          value={form.email}
          placeholder="Email"
          className="border p-2 w-full"
          onChange={handleChange}
        />
        <select
          name="rol"
          value={form.rol}
          className="border p-2 w-full"
          onChange={handleChange}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Guardar
        </button>
      </form>
    </div>
  );
}
