import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare(x, y) {
    setGameTurns((prevTurns) => {
      if (
        prevTurns.some((turn) => turn.position.x === x && turn.position.y === y)
      ) {
        return prevTurns;
      }

      const newTurns = [
        { player: activePlayer, position: { x, y } },

        ...prevTurns,
      ];
      setActivePlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));

      return newTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <li className={activePlayer === "X" ? "active" : ""}>
            <Player name="Player 1" icon="X" />
          </li>
          <li className={activePlayer === "O" ? "active" : ""}>
            <Player name="Player 2" icon="O" />
          </li>
        </ol>

        <GameBoard gameTurns={gameTurns} onSelectSquare={handleSelectSquare} />
      </div>
      <Log log={gameTurns} />
    </main>
  );
}

export default App;
