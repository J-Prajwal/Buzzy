import React from "react";
import { AngledImage } from "../Components/AngledImage";
import { useDispatch, useSelector } from "react-redux";
import { getLeaderboard } from "../Redux/App/app.actions";
import LeaderboardTable from "../Components/LeaderboardTable";
import { useEffect } from "react";
import { Button } from "@chakra-ui/react";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const { leaderboard } = useSelector((state) => state.app);
  console.log(leaderboard);
  useEffect(() => {
    dispatch(getLeaderboard());
  }, []);
  return (
    <div>
      <AngledImage />
      <LeaderboardTable leaderboard={leaderboard} />
      
    </div>
  );
};

export default Leaderboard;
