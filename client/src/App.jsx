import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/global/Login";
import Register from "./pages/global/Register";
import Home from "./pages/global/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
