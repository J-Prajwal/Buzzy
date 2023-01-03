// todo
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  console.log(isAuth)
  if (isAuth) {
    return children;
  }
  return <Navigate to={"/"} replace />;
};

export default RequireAuth;
