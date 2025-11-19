import axios from "axios";

const API = "http://localhost:5000/api/pools";

export const getPools = () => axios.get(API);
export const createPool = (data) => axios.post(API, data);
export const updatePool = (id, data) => axios.put(`${API}/${id}`, data);
export const deletePool = (id) => axios.delete(`${API}/${id}`);
