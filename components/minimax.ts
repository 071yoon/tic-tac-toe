import { Board } from "./Board";

export const minimax = (
  newBoard: Board,
  setMyBoard: (newBoard: Board) => void,
  myTurn: boolean
) => {
  let bestScore = -Infinity;
  let move = { i: 0, j: 0 };
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (newBoard[i][j] === "") {
        newBoard[i][j] = myTurn ? "X" : "O";
        let score = minimaxAlgorithm(newBoard, 0, false);
        newBoard[i][j] = "";
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  newBoard[move.i][move.j] = myTurn ? "X" : "O";
  setMyBoard(newBoard);
};

const checkWinner = (board: Board) => {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
      winner = board[i][0];
    }
  }

  // vertical
  for (let i = 0; i < 3; i++) {
    if (board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
      winner = board[0][i];
    }
  }

  // diagonal
  if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    winner = board[0][0];
  }

  if (board[2][0] === board[1][1] && board[2][0] === board[0][2]) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        openSpots++;
      }
    }
  }

  if (winner === null && openSpots === 0) {
    return "T";
  } else {
    return winner;
  }
};

const scores = {
  X: 10,
  O: -10,
  T: 0,
};

const minimaxAlgorithm = (
  newBoard: Board,
  depth: number,
  isMaximizing: boolean
) => {
  let result = checkWinner(newBoard) as "X" | "O" | "T" | null;
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (newBoard[i][j] === "") {
          newBoard[i][j] = "X";
          let score = minimaxAlgorithm(newBoard, depth + 1, false);
          newBoard[i][j] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (newBoard[i][j] === "") {
          newBoard[i][j] = "O";
          let score = minimaxAlgorithm(newBoard, depth + 1, true);
          newBoard[i][j] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
};
