import axios from "axios";
import { selectToken } from "../user/selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";
import { apiUrl } from "../../config/constants";

export const SAVE_ENTRY_SUCCESS = "SAVE_ENTRY_SUCCESS";
export const DELETE_ENTRY_SUCCESS = "DELETE_ENTRY_SUCCESS";
export const DELETE_ALL_ENTRIES_SUCCESS = "DELETE_ALL_ENTRIES_SUCCESS";
export const START_LOADING = "START_LOADING";
export const ENTRIES_FETCHED = "ENTRIES_FETCHED";

const saveEntrySuccess = (entry) => {
  return {
    type: SAVE_ENTRY_SUCCESS,
    payload: entry,
  };
};

const deleteEntrySuccess = (entryId) => {
  return {
    type: DELETE_ENTRY_SUCCESS,
    payload: entryId,
  };
};

const deleteAllEntriesSuccess = () => {
  return {
    type: DELETE_ALL_ENTRIES_SUCCESS,
  };
};

const startLoading = () => {
  return {
    type: START_LOADING,
  };
};

const entriesFetched = (entries) => {
  return {
    type: ENTRIES_FETCHED,
    payload: entries,
  };
};

// thunks

export const loadEntries = () => {
  return async (dispatch, getState) => {
    dispatch(startLoading());
    const token = selectToken(getState());

    if (token === null) return;

    const res = await axios.get(`${apiUrl}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const loadedEntries = res.data.entries;

    dispatch(entriesFetched(loadedEntries));
  };
};

export const saveEntry = (content, gifUrl) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    if (token === null) return;
    dispatch(appLoading());
    try {
      // console.log("anything we have here?", content, gifUrl, userId);
      const res = await axios.post(
        `${apiUrl}`,
        { content, gifUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(saveEntrySuccess(res.data));
      dispatch(appDoneLoading());
      dispatch(
        showMessageWithTimeout("success", false, res.data.message, 1500)
      );
    } catch (e) {
      if (e.response) {
        console.log(e.response.data.message);
        dispatch(setMessage("danger", true, e.response.data.message));
      } else {
        console.log(e.message);
        dispatch(setMessage("danger", true, e.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const deleteEntry = (entryId) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    if (token === null) return;

    dispatch(appLoading());
    try {
      const response = await axios.delete(`${apiUrl}/${entryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(deleteEntrySuccess(entryId));
      dispatch(appDoneLoading());
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 1500)
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const deleteAllEntries = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    if (token === null) return;

    dispatch(appLoading());
    try {
      const response = await axios.delete(`${apiUrl}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(deleteAllEntriesSuccess());
      dispatch(appDoneLoading());
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 1500)
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};
