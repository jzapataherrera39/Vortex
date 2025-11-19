import { create } from "zustand";
import { getPools as getPoolsApi } from "../api/poolApi";

const poolStore = create((set) => ({
  pools: [],
  
  // Función que trae las piscinas desde el backend
  fetchPools: async () => {
    try {
      const data = await getPoolsApi();
      set({ pools: data });
    } catch (err) {
      console.error("Error fetching pools:", err);
    }
  },

  addPool: async (pool) => { /* ... */ },
  editPool: async (id, pool) => { /* ... */ },
  deletePool: async (id) => { /* ... */ },
}));

export default poolStore;
