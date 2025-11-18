import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Tenant } from "./pages/Tenant";
import { CreateTenant } from "./pages/CreateTenant";
import { GetTenanats } from "./pages/GetTenants";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tenant"
            element={
              <ProtectedRoute>
                <Tenant />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-tenant"
            element={
              <ProtectedRoute>
                <CreateTenant />
              </ProtectedRoute>
            }
          />

          <Route
            path="/get-tenants"
            element={
              <ProtectedRoute>
                <GetTenanats />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
