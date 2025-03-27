export default function GameOver({ winner, onPlayAgain }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      <p>{winner ? `Winner: ${winner}` : "It's a draw!"}</p>
      <p>
        <button onClick={onPlayAgain}>Play Again</button>
      </p>
    </div>
  );
}
