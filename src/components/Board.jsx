import React from "react";
import Square from "./Square";

/*
  Board component with fixed-size squares.
  Highlights winning squares if available.
*/
export default function Board({ size, squares, onClick, winningSquares }) {
  const renderSquare = (i) => (
    <Square
      key={i}
      value={squares[i]}
      onClick={() => onClick(i)}
      highlight={winningSquares?.includes(i)}
    />
  );

  const boardStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${size}, 60px)`,
    gridTemplateRows: `repeat(${size}, 60px)`,
    gap: "4px",
    width: `${size * 60 + (size - 1) * 4}px`,
    height: `${size * 60 + (size - 1) * 4}px`,
    overflow: "hidden",
  };

  return (
    <div className="d-flex justify-content-center">
      <div style={boardStyle}>
        {Array.from({ length: size * size }, (_, i) => renderSquare(i))}
      </div>
    </div>
  );
}
