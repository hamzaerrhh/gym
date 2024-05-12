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
//import the images
import { massage, spa, keni } from "./assets";

import Layout from "./Layout";
import { Spa } from "./pages/user/Spa";
import Nurition from "./pages/user/Nurition";
import Event from "./pages/user/Event";
import Espace from "./pages/user/Espace";
import OurStore from "./pages/user/OurStore";
import ProductDetaile from "./pages/user/ProductDetaile";
import BookCoaching from "./pages/user/BookCoaching";
import Booking from "./pages/user/Booking";
import { useNavigate } from "react-router-dom";

import Chekout from "./pages/user/Chekout";
import Test from "./pages/user/Test";
import BookingPage from "./pages/user/BookingPage";
import ChekoutFood from "./pages/user/ChekoutFood";
import ErrorPage from "./components/ErrorPage";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  if (user) {
    console.log("he is a ", user.role);
  } else {
    console.log("no user found");
    navigate("/login");
  }

  return (
    <Routes>
      {!user && (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Register />} />
        </>
      )}
      {/*i will add route of coach 
      /add profile view  */}

      {user && (
        <>
          <Route path="/" element={<Layout />}>
            <Route path="/chekout/product" element={<Chekout />} />
            <Route path="/chekout/food" element={<ChekoutFood />} />
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

            <Route path="/store" element={<OurStore />} />
            <Route path="/store/:id" element={<ProductDetaile />} />
            <Route path="/findCoach" element={<BookCoaching />} />
            <Route path="/findCoach/:id" element={<Booking />} />
            <Route
              path="/spa/massage"
              element={
                <BookingPage
                  image={massage}
                  title1={"massage"}
                  title2={"hhhh"}
                  para={"hello baby"}
                  type={"massage"}
                />
              }
            />
            <Route
              path="/spa/keni"
              element={
                <BookingPage
                  image={keni}
                  title1={"keni"}
                  title2={"hhhh"}
                  para={"hello baby"}
                  type={"kenie"}
                />
              }
            />
            <Route
              path="/spa/spa"
              element={
                <BookingPage
                  image={spa}
                  title1={"test"}
                  title2={"hhhh"}
                  para={"hello baby"}
                  type={"spa"}
                />
              }
            />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </>
      )}
    </Routes>
  );
}

export default App;
