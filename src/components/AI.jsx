/*
   AI logic for Tic-Tac-Toe / Caro Game
  + Easy mode:   Makes a random move
  + Hard mode:   Uses Minimax algorithm with heuristic scoring
  + calculateWinner: Detects N-in-a-row (5-in-a-row if board ≥ 5×5)
*/

/* 
  EASY MODE — Random Move
   Chooses a random empty cell on the board
 */
export function getRandomMove(squares) {
  const empty = squares
    .map((v, i) => (v === null ? i : null))
    .filter((v) => v !== null);

  if (empty.length === 0) return -1;
  const randomIndex = Math.floor(Math.random() * empty.length);
  return empty[randomIndex];
}

/* 
    HARD MODE — Minimax Algorithm (with limited depth)
   Evaluates moves using recursion and heuristic scoring.
   "O" is the AI, "X" is the human player.
*/
export function getBestMove(squares, size, isMaximizing, depth = 0, maxDepth = 2) {
  const { winner } = calculateWinner(squares, size);

  // Terminal states
  if (winner === "X") return { score: -10000 };
  if (winner === "O") return { score: 10000 };
  if (squares.every(Boolean)) return { score: 0 };

  // Limit recursion depth for larger boards
  if (size > 3 && depth >= maxDepth) {
    return { score: evaluateBoard(squares, size) };
  }

  // Initialize best score
  let best = { index: -1, score: isMaximizing ? -Infinity : Infinity };

  // Try every possible move
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      squares[i] = isMaximizing ? "O" : "X";

      const result = getBestMove([...squares], size, !isMaximizing, depth + 1, maxDepth);
      squares[i] = null;

      if (!result || typeof result.score !== "number") continue;

      // Choose best score depending on maximizing/minimizing
      if (isMaximizing) {
        if (result.score > best.score) best = { index: i, score: result.score };
      } else {
        if (result.score < best.score) best = { index: i, score: result.score };
      }
    }
  }

  if (best.index === -1) return { score: 0 };
  return best;
}

/* 
   HEURISTIC EVALUATION FUNCTION
   Estimates board strength when no terminal state is found.
   - Rewards AI ("O") streaks.
   - Penalizes player ("X") streaks.
   - Bonus points for “open-ended” sequences (both sides open).
 */
function evaluateBoard(squares, size) {
  let score = 0;
  const getVal = (r, c) => squares[r * size + c];
  const inBounds = (r, c) => r >= 0 && r < size && c >= 0 && c < size;

  const dirs = [
    [0, 1],  // horizontal
    [1, 0],  // vertical
    [1, 1],  // main diagonal
    [1, -1], // anti diagonal
  ];

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const val = getVal(r, c);
      if (!val) continue;

      for (let [dr, dc] of dirs) {
        let streak = 0;
        let openEnds = 0;

        // Count streak length (up to 5 cells)
        for (let k = 0; k < 5; k++) {
          const nr = r + dr * k;
          const nc = c + dc * k;
          if (inBounds(nr, nc) && getVal(nr, nc) === val) streak++;
          else break;
        }

        // Check open ends (available spaces at both ends)
        const prevR = r - dr;
        const prevC = c - dc;
        const nextR = r + dr * streak;
        const nextC = c + dc * streak;
        if (inBounds(prevR, prevC) && !getVal(prevR, prevC)) openEnds++;
        if (inBounds(nextR, nextC) && !getVal(nextR, nextC)) openEnds++;

        // Base point values by streak length
        const basePoints = [0, 5, 50, 500, 5000, 10000];
        const pts = val === "O" ? basePoints[streak] : -basePoints[streak];
        const bonus = openEnds * 0.5 * Math.abs(pts); // reward open-ended lines

        score += pts + (val === "O" ? bonus : -bonus);
      }
    }
  }

  return score;
}

/* 
   WIN DETECTION
   Checks for N-in-a-row.
   Uses 5-in-a-row for large boards (size ≥ 5).
 */
export function calculateWinner(squares, size) {
  const target = size >= 5 ? 5 : size;
  const getVal = (r, c) => squares[r * size + c];
  const inBounds = (r, c) => r >= 0 && r < size && c >= 0 && c < size;

  const directions = [
    [0, 1],  // horizontal
    [1, 0],  // vertical
    [1, 1],  // main diagonal
    [1, -1], // anti diagonal
  ];

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const current = getVal(r, c);
      if (!current) continue;

      for (let [dr, dc] of directions) {
        let line = [[r, c]];
        let nr = r + dr, nc = c + dc;

        // Expand line in the given direction
        while (inBounds(nr, nc) && getVal(nr, nc) === current) {
          line.push([nr, nc]);
          nr += dr;
          nc += dc;
        }

        // Win condition met
        if (line.length >= target) {
          const lineIdx = line.map(([r, c]) => r * size + c);
          return { winner: current, line: lineIdx };
        }
      }
    }
  }

  // No winner yet
  return { winner: null, line: null };
}
