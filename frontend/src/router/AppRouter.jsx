import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Welcome from "../pages/Welcome";
import Login from "../pages/Login";

import PoolList from "../pages/Pools/PoolList";
import PoolCreate from "../pages/Pools/CreatePool";
import PoolEdit from "../pages/Pools/EditPool";
import UsersList from "../pages/Users/UsersList";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas */}
      <Route
        path="/pools"
        element={
          <PrivateRoute>
            <PoolList />
          </PrivateRoute>
        }
      />

      <Route
        path="/pools/create"
        element={
          <PrivateRoute>
            <PoolCreate />
          </PrivateRoute>
        }
      />

      <Route
        path="/pools/edit/:id"
        element={
          <PrivateRoute>
            <PoolEdit />
          </PrivateRoute>
        }
      />

      <Route
        path="/users"
        element={
          <PrivateRoute>
            <UsersList />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
