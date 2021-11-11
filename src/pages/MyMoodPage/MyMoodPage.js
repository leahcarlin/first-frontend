import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Mood from "../../components/Mood";
import "./MyMoodPage.css";

import {
  loadEntries,
  deleteEntry,
  deleteAllEntries,
} from "../../store/entries/actions";
import {
  selectEntriesLoading,
  selectEntries,
} from "../../store/entries/selectors";

export default function MyMoodPage() {
  const dispatch = useDispatch();

  const loading = useSelector(selectEntriesLoading);
  const listOfEntries = useSelector(selectEntries);

  useEffect(() => {
    dispatch(loadEntries());
  }, [dispatch]);

  const onDelete = (id) => {
    console.log("deleting mood!", id);
    dispatch(deleteEntry(id));
  };

  const onDeleteAll = () => {
    console.log("deleting mood!");
    dispatch(deleteAllEntries());
  };

  return (
    <div className="container">
      <h1>My Mood History</h1>
      {loading ? (
        <em>Loading...</em>
      ) : (
        <div className="card-container">
          {listOfEntries.map((entry) => (
            <div className="mood-card" key={entry.id}>
              <Mood mood={entry} />
              <button className="button-32" onClick={() => onDelete(entry.id)}>
                Delete the mood
              </button>
            </div>
          ))}
        </div>
      )}
      {listOfEntries ? (
        <div style={{ marginTop: "30px" }}>
          <button className="button-33" onClick={onDeleteAll}>
            Delete All
          </button>
        </div>
      ) : null}
    </div>
  );
}
