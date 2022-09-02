import React from "react";
import { AngledImage } from "../Components/AngledImage";
import Statistics from "../Components/Statistics";
import { useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";
import { getLeaderboard } from "../Redux/App/app.actions";
import LeaderboardTable from "../Components/LeaderboardTable";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const postHandler = () => {
    dispatch(getLeaderboard());
  };
  return (
    <div>
      <AngledImage />
      <Statistics />
      <LeaderboardTable />
      <Button onClick={postHandler}>get leaderboard</Button>
    </div>
  );
};

export default Leaderboard;
