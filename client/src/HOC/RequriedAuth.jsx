// todo
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getItem } from "../Utils/localStorage";

const RequireAuth = ({ children }) => {
  // const  state  = useSelector((state) => state.auth);
  // console.log(state.isAuth);
  const token = getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default RequireAuth;