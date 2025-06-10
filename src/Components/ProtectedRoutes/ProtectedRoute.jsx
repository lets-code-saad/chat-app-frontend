import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    // Date.now() is a JavaScript method that returns the number of milliseconds.
    // Dividing by 1000 converts milliseconds to seconds.
    if (decoded.exp < currentTime) {
      // token expired
      toast.error("Token Expired, Please Login Again!")
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
