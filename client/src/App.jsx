import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/global/Login";
import Register from "./pages/global/Register";
import Home from "./pages/global/Home";
import ConfirmPage from "./pages/global/ConfirmPage";
import ForgetPass from "./pages/global/ForgetPass";
import EditPass from "./pages/global/EditPass";
import Clubs from "./pages/global/Clubs";
import PersonaleTraining from "./pages/user/PersonaleTraining";
import Store from "./pages/user/Store";
import NavBar from "./components/NavBar";
import Layout from "./Layout";
import { Spa } from "./pages/user/Spa";
import Nurition from "./pages/user/Nurition";
import Event from "./pages/user/Event";
import Espace from "./pages/user/Espace";
import OurStore from "./pages/user/OurStore";
import ProductDetaile from "./pages/user/ProductDetaile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/Clubs" element={<Clubs />} />
        <Route path="/forget" element={<ForgetPass />} />
        <Route path="/forget/:forgetToken" element={<EditPass />} />
        <Route path="/confirm/:activation" element={<ConfirmPage />} />
        <Route path="/personal_training" element={<PersonaleTraining />} />
        <Route path="/" element={<Home />} />
        <Route path="/spa" element={<Spa />} />
        <Route path="/nurition" element={<Nurition />} />
        <Route path="/event" element={<Event />} />
        <Route path="/espace" element={<Espace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/store" element={<OurStore />} />
        <Route path="/store/:id" element={<ProductDetaile />} />
      </Route>
    </Routes>
  );
}

export default App;
