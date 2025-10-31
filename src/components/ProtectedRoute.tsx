import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React, { ReactNode } from "react";


export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}