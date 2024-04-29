import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import { useAuthContext } from "./hook/useAuthContext";
import Home from "./pages/Home";
import Dashboard from "./pages/adminPages/Dashboard";
function App() {
  const { user } = useAuthContext();
  if (user) {
    console.log("he is a ", user.role);
  }

  return (
    <Routes>
      {/* Use a conditional rendering to render the Route */}
      {!user && (
        // If user is not authenticated, render the Login component
        <Route path="/" element={<Login />} />
      )}
      {user && user.role == "admin" && (
        <Route path="/" element={<Home Component={<Dashboard />} />} />
      )}
    </Routes>
  );
}

export default App;
