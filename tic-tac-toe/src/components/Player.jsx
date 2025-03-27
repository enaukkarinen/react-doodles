import { useState } from "react";

export default function Player({ name = "Player 1", icon = "X" }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function onButtonClick() {
    setIsEditing((editing) => !editing);
  }

  function onInputChange(event) {
    setPlayerName(event.target.value);
  }

  const nameElement = isEditing ? (
    <input type="text" value={playerName} required onChange={onInputChange} />
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
