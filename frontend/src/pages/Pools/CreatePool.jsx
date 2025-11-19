import { useState } from "react";
import { useNavigate } from "react-router-dom";
import poolStore from "../../store/poolStore";

export default function CreatePool() {
  const navigate = useNavigate();
  const { createPool } = poolStore();

  const [form, setForm] = useState({
    nombre: "",
    tamaño: "",
    capacidad: "",
    estado: "activo",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createPool(form);
    navigate("/pools");
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Crear Piscina</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="nombre"
          placeholder="Nombre"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="tamaño"
          placeholder="Tamaño (m²)"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="capacidad"
          placeholder="Capacidad (L)"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <select
          name="estado"
          className="border p-2 w-full"
          onChange={handleChange}
        >
          <option value="activo">Activa</option>
          <option value="inactivo">Inactiva</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Guardar
        </button>
      </form>
    </div>
  );
}
