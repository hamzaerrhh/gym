import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import { useAuthContext } from "./hook/useAuthContext";
import Dashboard from "./pages/adminPages/Dashboard";
import Order from "./pages/adminPages/Order";
import Clubs from "./pages/adminPages/Clubs";
import Layout from "./pages/Layout";
import Product from "./pages/adminPages/Product";
function App() {
  const { user } = useAuthContext();
  if (user) {
    console.log("he is a ", user.role);
  }

  return (
    <Routes>
      {!user && (
        // If user is not authenticated, render the Login component
        <Route path="/" element={<Login />} />
      )}
      {user && user.role == "admin" && (
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/order" element={<Order />} />
          <Route path="club" element={<Clubs />} />
          <Route index element={<Product />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
