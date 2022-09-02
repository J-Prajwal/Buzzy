// todo
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { state } = useSelector((state) => state.auth);
  console.log(state.isAuth);
  return state.isAuth ? children : <Navigate to="/login" />;
};

export default RequireAuth;