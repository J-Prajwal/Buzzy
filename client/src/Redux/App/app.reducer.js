import * as types from "./app.actionTypes";

const initialState = {
  data: [],
  leaderboard: [],
  username: "",
  isLoading: false,
  isError: false,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_LEADERBORD_SUCCESS:
      return {
        ...state,
        leaderboard: payload,
      };
    default:
      return state;
  }
};
