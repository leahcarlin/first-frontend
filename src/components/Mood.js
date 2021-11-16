import moment from "moment";
import "moment/locale/en-gb";

export default function Mood({ mood }) {
  moment.locale("en-gb"); // european date format
  return (
    <>
      <p>
        <b>{moment(mood.createdAt).format("LL")}</b>
      </p>
      <p>{mood.content}</p>
      <img alt={mood.content} src={mood.gifUrl} />
    </>
  );
}
