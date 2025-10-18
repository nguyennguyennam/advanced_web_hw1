/*
  AI logic for Tic-Tac-Toe / Caro game (smart version)
  + Easy mode: Random move
  + Difficult mode: Minimax + heuristic (limited depth)
  + calculateWinner: n-in-a-row (5-in-a-row if size >= 5)
*/

// 🔹 EASY MODE: random move among empty squares
export function getRandomMove(squares) {
  const empty = squares
    .map((v, i) => (v === null ? i : null))
    .filter((v) => v !== null);

  if (empty.length === 0) return -1;
  const randomIndex = Math.floor(Math.random() * empty.length);
  return empty[randomIndex];
}

// 🔹 DIFFICULT MODE: minimax + heuristic scoring
export function getBestMove(squares, size, isMaximizing, depth = 0, maxDepth = 2) {
  const { winner } = calculateWinner(squares, size);
  if (winner === "X") return { score: -10000 };
  if (winner === "O") return { score: 10000 };
  if (squares.every(Boolean)) return { score: 0 };

  // Giới hạn độ sâu cho bàn lớn
  if (size > 3 && depth >= maxDepth) {
    return { score: evaluateBoard(squares, size) };
  }

  let best = { index: -1, score: isMaximizing ? -Infinity : Infinity };

  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      squares[i] = isMaximizing ? "O" : "X";
      const result = getBestMove([...squares], size, !isMaximizing, depth + 1, maxDepth);
      squares[i] = null;

      if (!result || typeof result.score !== "number") continue;

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

// 🔹 IMPROVED HEURISTIC EVALUATION FUNCTION
// AI ("O") will be awarded,  ("X") will be penalized.
// Calculate by streaks.
function evaluateBoard(squares, size) {
  let score = 0;
  const getVal = (r, c) => squares[r * size + c];
  const inBounds = (r, c) => r >= 0 && r < size && c >= 0 && c < size;

  const dirs = [
    [0, 1],  // ngang
    [1, 0],  // dọc
    [1, 1],  // chéo chính
    [1, -1], // chéo phụ
  ];

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const val = getVal(r, c);
      if (!val) continue;

      for (let [dr, dc] of dirs) {
        let streak = 0;
        let openEnds = 0;

        // Kiểm tra chuỗi 5 ô liền
        for (let k = 0; k < 5; k++) {
          const nr = r + dr * k;
          const nc = c + dc * k;
          if (inBounds(nr, nc) && getVal(nr, nc) === val) streak++;
          else break;
        }

        // Kiểm tra mở hai đầu (điểm cao hơn nếu còn ô trống để nối chuỗi)
        const prevR = r - dr;
        const prevC = c - dc;
        const nextR = r + dr * streak;
        const nextC = c + dc * streak;
        if (inBounds(prevR, prevC) && !getVal(prevR, prevC)) openEnds++;
        if (inBounds(nextR, nextC) && !getVal(nextR, nextC)) openEnds++;

        const basePoints = [0, 5, 50, 500, 5000, 10000];
        const pts = val === "O" ? basePoints[streak] : -basePoints[streak];
        const bonus = openEnds * 0.5 * Math.abs(pts); // thưởng cho thế mở

        score += pts + (val === "O" ? bonus : -bonus);
      }
    }
  }

  return score;
}

export function calculateWinner(squares, size) {
  const target = size >= 5 ? 5 : size;
  const getVal = (r, c) => squares[r * size + c];
  const inBounds = (r, c) => r >= 0 && r < size && c >= 0 && c < size;

  const directions = [
    [0, 1],  
    [1, 0],  
    [1, 1],  
    [1, -1], 
  ];

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const current = getVal(r, c);
      if (!current) continue;

      for (let [dr, dc] of directions) {
        let line = [[r, c]];
        let nr = r + dr, nc = c + dc;

        while (inBounds(nr, nc) && getVal(nr, nc) === current) {
          line.push([nr, nc]);
          nr += dr;
          nc += dc;
        }

        if (line.length >= target) {
          const lineIdx = line.map(([r, c]) => r * size + c);
          return { winner: current, line: lineIdx };
        }
      }
    }
  }

  return { winner: null, line: null };
}
