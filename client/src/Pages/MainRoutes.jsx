import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Leaderboard from "./Leaderboard";
import Login from "./Login";
import Recorder from "./Recorder";
import SignUp from "./Signup";
import RequireAuth from "../HOC/RequriedAuth"

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/recorder"
        element={
          <RequireAuth>
            <Recorder />
          </RequireAuth>
        }
      />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
};

export default MainRoutes;
