import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard(gameTurns) {
  const newBoard = [...initialGameBoard.map((row) => [...row])];
  for (const turn of gameTurns) {
    const { player, position } = turn;
    const { x, y } = position;
    newBoard[x][y] = player;
  }

  return newBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;

    const firstSymbol = gameBoard[a.x][a.y];
    const secondSymbol = gameBoard[b.x][b.y];
    const thirdSymbol = gameBoard[c.x][c.y];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = players[firstSymbol];
      break;
    }
  }
  return winner;
}

function App() {
  console.log("App rendered");
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });

  const isDraw = gameTurns.length === 9;
  const activePlayer = gameTurns.length % 2 === 0 ? "X" : "O";

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  function handleSelectSquare(x, y) {
    setGameTurns((prevTurns) => {
      const newTurns = [
        { player: activePlayer, position: { x, y } },
        ...prevTurns,
      ];

      return newTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerChange(symbol, newName) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: newName,
    }));
  }

  // Render
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <li className={activePlayer === "X" ? "active" : ""}>
            <Player
              initialName={players.X}
              icon="X"
              onChangeName={handlePlayerChange}
            />
          </li>
          <li className={activePlayer === "O" ? "active" : ""}>
            <Player
              initialName={players.O}
              icon="O"
              onChangeName={handlePlayerChange}
            />
          </li>
        </ol>

        {(winner || isDraw) && (
          <GameOver winner={winner} onPlayAgain={handleRestart} />
        )}

        <GameBoard gameBoard={gameBoard} onSelectSquare={handleSelectSquare} />
      </div>
      <Log log={gameTurns} />
    </main>
  );
}

export default App;
