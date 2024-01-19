import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

const AppRoutes: React.FC = (): React.ReactElement => {
  const { search } = useLocation();

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to={`login${search}`} replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
