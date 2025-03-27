export default function Log({ log }) {
  return <ol id="log">
    {log?.map((turn, index) => (
      <li key={index} className={index === 0 ? "highlighted" : ""}>
        <p>{turn.player} played at {turn.position.x}, {turn.position.y}</p>
      </li>
    ))}
  </ol>;
}
