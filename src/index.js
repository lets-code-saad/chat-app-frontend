import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./Components/Auth/SignupPage/SignupPage";
import SigninPage from "./Components/Auth/SigninPage/SigninPage";
import ForgotPass from "./Components/Auth/ForgotPass/ForgotPass";
import Store from "./Components/Store/Store";
import { Provider } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoute";
import PublicRoutes from "./Components/PublicRoutes/PublicRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <PublicRoutes>
              <SigninPage />
            </PublicRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoutes>
              <SignUpPage />
            </PublicRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <SigninPage />
            </PublicRoutes>
          }
        />
        <Route
          path="/forgot-pass"
          element={
            <PublicRoutes>
              <ForgotPass />
            </PublicRoutes>
          }
        />
        {/* PROTECTED ROUTE */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </Provider>
);
