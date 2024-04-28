import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/global/Login";
import Register from "./pages/global/Register";
import Home from "./pages/global/Home";
import ConfirmPage from "./pages/global/ConfirmPage";
import ForgetPass from "./pages/global/ForgetPass";
import EditPass from "./pages/global/EditPass";

function App() {
  return (
    <Routes>
      <Route path="/forget" element={<ForgetPass />} />
      <Route path="/forget/:forgetToken" element={<EditPass />} />
      <Route path="/confirm/:activation" element={<ConfirmPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
