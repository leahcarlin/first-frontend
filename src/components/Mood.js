export default function Mood({ mood }) {
  return (
    <div>
      <strong>{mood.content}</strong>
      <img alt={mood.content} src={mood.gifUrl} />
    </div>
  );
}
