import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProductLibrary from "./pages/ProductLibrary.jsx";
import Collection from "./pages/Collection.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import NotFound from "./pages/NotFound.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Protected: sidebar wala layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Navigate to="/products/library" replace />} />
          <Route path="/products/library" element={<ProductLibrary />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/collection" element={<Collection />} />
          {/* Aage naye page yahin add karna */}
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
