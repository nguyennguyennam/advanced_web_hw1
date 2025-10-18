import React, { useState, useEffect } from "react";
import Board from "./Board";
import MoveHistory from "./MoveHistory";
import Settings from "./Settings";
import { getRandomMove, getBestMove, calculateWinner } from "./AI";

export default function Game() {
  const [size, setSize] = useState(3);
  const [mode, setMode] = useState("easy");
  const [history, setHistory] = useState([
    { squares: Array(3 * 3).fill(null), row: null, col: null },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [asc, setAsc] = useState(true);
  const [playerTurn, setPlayerTurn] = useState(true);

  const current = history[currentMove];
  const { winner, line: winningSquares } = calculateWinner(current.squares, size);

  // Người chơi click
  function handlePlay(i) {
    if (!playerTurn || winner || current.squares[i]) return;

    const nextSquares = current.squares.slice();
    nextSquares[i] = "X";
    const row = Math.floor(i / size) + 1;
    const col = (i % size) + 1;

    const nextHistory = history
      .slice(0, currentMove + 1)
      .concat([{ squares: nextSquares, row, col }]);

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setPlayerTurn(false);
  }

  // AI tự đi
  useEffect(() => {
    if (!playerTurn && !winner) {
      const aiMove =
        mode === "easy"
          ? getRandomMove(current.squares)
          : getBestMove([...current.squares], size, true)?.index;

      if (aiMove >= 0) {
        setTimeout(() => {
          const nextSquares = current.squares.slice();
          nextSquares[aiMove] = "O";
          const row = Math.floor(aiMove / size) + 1;
          const col = (aiMove % size) + 1;

          const nextHistory = history
            .slice(0, currentMove + 1)
            .concat([{ squares: nextSquares, row, col }]);

          setHistory(nextHistory);
          setCurrentMove(nextHistory.length - 1);
          setPlayerTurn(true);
        }, 400);
      }
    }
    // eslint-disable-next-line
  }, [playerTurn, winner]);

  const jumpTo = (move) => setCurrentMove(move);

  const startNew = () => {
    const boardSize =
      !size || isNaN(size) || size < 3 || size > 10 ? 3 : size;
    const newBoard = Array(boardSize * boardSize).fill(null);
    setHistory([{ squares: newBoard, row: null, col: null }]);
    setCurrentMove(0);
    setPlayerTurn(true);
  };

  const draw = !winner && current.squares.every(Boolean);

  let status;
  if (winner)
    status = <span className="text-success fw-semibold">Winner: {winner}</span>;
  else
    status = (
      <>
        Next player:{" "}
        <span className="fw-semibold">{playerTurn ? "X (You)" : "O (AI)"}</span>
      </>
    );

  return (
    <div className="container py-3 text-center">
      <Settings
        size={size}
        setSize={setSize}
        mode={mode}
        setMode={setMode}
        onStart={startNew}
      />

      <div className="row justify-content-center g-4">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header fw-semibold d-flex justify-content-between">
              <div style={{ color: "#6A1B9A" }}>{status}</div>
              <button className="btn btn-outline-dark btn-sm" onClick={startNew}>
                Reset
              </button>
            </div>

            <div className="card-body d-flex justify-content-center">
              <Board
                size={size}
                squares={current.squares}
                onClick={handlePlay}
                winningSquares={winningSquares}
              />
            </div>

            {winner && (
              <div
                className="alert mb-0"
                style={{
                  backgroundColor: winner === "X" ? "#ccecd5ff" : "#e9ccceff",
                  color: winner === "X" ? "#6A1B9A" : "#C62828",
                  fontFamily: "'Inika', serif", 
                  fontWeight: 600,
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  opacity: 1,
                }}
              >
                {winner === "X" ? " You won!" : " You lose!"}
              </div>
            )}

            {draw && (
              <div className="alert alert-warning mb-0">A Draw!</div>
            )}
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-header fw-semibold d-flex justify-content-between align-items-center">
              <span>Move History</span>

              {/* Toggle Sort Switch (React tooltip + click updates instantly) */}
              <div
                className="form-check form-switch position-relative"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/** Tooltip controlled by React */}
                <div
                  className="position-absolute px-2 py-1 rounded small text-white"
                  style={{
                    top: "-35px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(90deg, #9E72C3, #924DBF )",
                    fontFamily: 'Inika',
                    fontSize: "0.75rem",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                  }}
                  id="sortTooltip"
                >
                  {asc ? "Ascending" : "Descending"}
                </div>

                <input
                  className="form-check-input"
                  type="checkbox"
                  id="sortToggle"
                  checked={asc}
                  onChange={() => setAsc((s) => !s)}
                  onMouseEnter={() => {
                    const tooltip = document.getElementById("sortTooltip");
                    if (tooltip) tooltip.style.opacity = "1";
                  }}
                  onMouseLeave={() => {
                    const tooltip = document.getElementById("sortTooltip");
                    if (tooltip) tooltip.style.opacity = "0";
                  }}
                  style={{
                    cursor: "pointer",
                    width: "2.8rem",
                    height: "1.5rem",
                    backgroundColor: asc ? "#8e24aa" : "#ccc",
                    border: "none",
                    boxShadow: asc
                      ? "inset 0 0 3px rgba(0,0,0,0.2)"
                      : "inset 0 0 3px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                  }}
                />
              </div>

            </div>

            <div className="card-body">
              <MoveHistory
                history={history}
                currentMove={currentMove}
                jumpTo={jumpTo}
                asc={asc}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
