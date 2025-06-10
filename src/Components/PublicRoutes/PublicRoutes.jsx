import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PublicRoutes = ({ children }) => {
 const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log(decoded,"decodedjwt");
      
      const currentTime = Date.now() / 1000;
      if (decoded.exp > currentTime) {
        return <Navigate to="/home" replace />;
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      localStorage.removeItem("token");
    }
  }


  return children;
};

export default PublicRoutes;
