import { useState } from "react";

export default function Player({
  initialName = "Player 1",
  icon = "X",
  onChangeName,
}) {
  console.log("Player rendered");
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function onButtonClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      console.log("Save", playerName);
      onChangeName(icon, playerName);
    }
  }

  function onInputChange(event) {
    setPlayerName(event.target.value);
  }

  const nameElement = isEditing ? (
    <input
      type="text"
      defaultValue={playerName}
      required
      onChange={onInputChange}
    />
  ) : (
    <span>{playerName}</span>
  );
  return (
    <>
      <span className="player">
        {nameElement}
        <span className="player-symbol">{icon}</span>
      </span>
      <button onClick={onButtonClick}>{isEditing ? "Save" : "Edit"}</button>
    </>
  );
}
