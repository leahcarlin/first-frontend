import {
  DELETE_ENTRY_SUCCESS,
  DELETE_ALL_ENTRIES_SUCCESS,
  START_LOADING,
  ENTRIES_FETCHED,
} from "./actions";

const initialState = {
  loading: false,
  entries: [],
};

export default function entriesSliceReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case ENTRIES_FETCHED: {
      return {
        loading: false,
        entries: [...action.payload],
      };
    }
    case DELETE_ENTRY_SUCCESS: {
      const entryId = parseInt(action.payload);
      const updatedEntry = state.entries.filter(
        (entry) => entry.id !== entryId
      );

      return {
        ...state,
        entries: updatedEntry,
      };
    }
    case DELETE_ALL_ENTRIES_SUCCESS: {
      return {
        ...state,
        entries: [],
      };
    }
    default: {
      return state;
    }
  }
}
