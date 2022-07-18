import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async (dispatch) =>
  dispatch({ type: FETCH_USER, payload: await axios.get("/api/current_user") });

export const handleToken = (token) => async (dispatch) =>
  dispatch({
    type: FETCH_USER,
    payload: await axios.post("/api/stripe", token),
  });

export const submitSurvey = (values, history) => async (dispatch) => {
  history.push("/surveys");
  dispatch({
    type: FETCH_USER,
    payload: await axios.post("/api/surveys", values),
  });
};
