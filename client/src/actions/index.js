import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

export const fetchUser = () => async (dispatch) =>
  dispatch({ type: FETCH_USER, payload: await axios.get("/api/current_user") });

export const fetchSurveys = () => async (dispatch) =>
  dispatch({ type: FETCH_SURVEYS, payload: await axios.get("/api/surveys") });

export const handleToken = (token) => async (dispatch) =>
  dispatch({
    type: FETCH_USER,
    payload: await axios.post("/api/stripe", token),
  });

export const submitSurvey = (values, history) => async (dispatch) => {
  dispatch({
    type: FETCH_USER,
    payload: await axios.post("/api/surveys", values),
  });
  history.push("/surveys");
};

export const saveDraft = (values, history) => async (dispatch) => {
  dispatch({
    type: FETCH_USER,
    payload: await axios.post("/api/drafts", values),
  });
  history.push("/surveys");
};