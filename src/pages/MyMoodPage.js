import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Mood from "../components/Mood";

import {
  loadEntries,
  deleteEntry,
  deleteAllEntries,
} from "../store/entries/actions";
import {
  selectEntriesLoading,
  selectEntries,
} from "../store/entries/selectors";

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
    <div>
      <h1>Moods</h1>
      {loading ? (
        <em>Loading...</em>
      ) : (
        <div>
          {listOfEntries.map((entry) => (
            <div key={entry.id}>
              <Mood mood={entry} />
              <button onClick={() => onDelete(entry.id)}>
                Delete the mood
              </button>
            </div>
          ))}
          <button onClick={() => onDeleteAll()}>Delete all</button>
        </div>
      )}
    </div>
  );
}
