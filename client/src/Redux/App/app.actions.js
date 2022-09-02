import * as types from "./app.actionTypes";
import axios from "axios";
import { getItem } from "../../Utils/localStorage";

const token = getItem("token");

export const postRecord = (payload) => (dispatch) => {
  dispatch({ type: types.POST_RECORD_REQUEST });
  return axios
    .post("http://localhost:7000/record/create", payload, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({ type: types.POST_RECORD_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: types.POST_RECORD_FAILURE });
    });
};

export const getLeaderboard = (payload) => (dispatch) => {
  dispatch({ type: types.GET_LEADERBORD_REQUEST });
  return axios
    .get("http://localhost:7000/record/leaderboard", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({ type: types.GET_LEADERBORD_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: types.GET_LEADERBORD_FAILURE });
    });
};

export const postLeaderboard = (payload) => (dispatch) => {
  dispatch({ type: types.POST_LEADERBOARD_REQUEST });
  return axios
    .post("http://localhost:7000/record/leaderboard/post", payload, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
