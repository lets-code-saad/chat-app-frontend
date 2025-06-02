import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./Components/Auth/SignupPage/SignupPage";
import SigninPage from "./Components/Auth/SigninPage/SigninPage";
import ForgotPass from "./Components/Auth/ForgotPass/ForgotPass";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUpPage />} />
      <Route path="/home" element={<App />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<SigninPage/>} />
      <Route path="/forgot-pass" element={<ForgotPass/>} />
    </Routes>
  </BrowserRouter>
);
