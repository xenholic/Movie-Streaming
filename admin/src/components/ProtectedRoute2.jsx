import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute2 = ({ children }) => {
  const isAuthenticated = localStorage.getItem("accessToken");

  if (isAuthenticated) return <Navigate to={"/"} />;

  return children;
};

export default ProtectedRoute2;
