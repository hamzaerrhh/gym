import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import { useAuthContext } from "./hook/useAuthContext";
import Dashboard from "./pages/adminPages/Dashboard";
import Order from "./pages/adminPages/Order";
import Layout from "./pages/Layout";
import Product from "./pages/adminPages/Product";
import AddProduct from "./pages/adminPages/card/AddProduct";
import Club from "./pages/adminPages/Club";
import User from "./pages/adminPages/User";
import Event from "./pages/adminPages/Event";
import Admin from "./pages/adminPages/Admin";
import Setting from "./pages/adminPages/Setting";
import Foode from "./pages/adminPages/Foode";
import Appoinements from "./pages/adminPages/card/Appoinements";

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Order />} />
          <Route index element={<Product />} />
          <Route path="/product" element={<Product />} />
          <Route path="/club" element={<Club />} />
          <Route path="/users" element={<User />} />
          <Route path="/event" element={<Event />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/food" element={<Foode />} />
          <Route path="/appoinements" element={<Appoinements />} />
          <Route path="/addProduct" element={<AddProduct />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
