import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import poolStore from "../../store/poolStore";
import { getPools } from "../../api/poolApi";

export default function EditPool() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { updatePool } = poolStore();

  const [form, setForm] = useState({
    nombre: "",
    tamaño: "",
    capacidad: "",
    estado: "activo",
  });

  useEffect(() => {
    async function loadPool() {
      const res = await getPools();          // Trae todas
      const pool = res.data.find((p) => p._id === id);  // Filtra la que toca

      if (!pool) return;

      setForm({
        nombre: pool.nombre,
        tamaño: pool.tamaño,
        capacidad: pool.capacidad,
        estado: pool.estado,
      });
    }

    loadPool();
  }, [id]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await updatePool(id, form);
    navigate("/pools");
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Editar Piscina</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="nombre"
          value={form.nombre}
          placeholder="Nombre"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="tamaño"
          value={form.tamaño}
          placeholder="Tamaño (m²)"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="capacidad"
          value={form.capacidad}
          placeholder="Capacidad (L)"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <select
          name="estado"
          value={form.estado}
          className="border p-2 w-full"
          onChange={handleChange}
        >
          <option value="activo">Activa</option>
          <option value="inactivo">Inactiva</option>
        </select>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Actualizar
        </button>
      </form>
    </div>
  );
}
