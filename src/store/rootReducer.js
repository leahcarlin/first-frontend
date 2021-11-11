import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import entries from "./entries/reducer";

export default combineReducers({
  appState,
  user,
  entries,
});
