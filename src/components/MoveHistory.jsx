import React from "react";

export default function MoveHistory({ history, currentMove, jumpTo, asc }) {
  const moves = history.map((step, move) => {
    const desc = move
      ? `Go to move #${move} (${step.row}, ${step.col})`
      : "Go to game start";

    if (move === currentMove)
      return (
        <li
          key={move}
          className="list-group-item bg-light text-dark fw-semibold"
        >
          You are at move #{move}
        </li>
      );

    return (
      <li key={move} className="list-group-item">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  return (
    <ol className="list-group list-group-numbered">
      {asc ? moves : [...moves].reverse()}
    </ol>
  );
}
