import { Board } from "./Board";

export const minimax = (newBoard: Board, setMyBoard: any) => {
  let bestScore = -Infinity;
  let move = { i: 0, j: 0 };
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (newBoard[i][j] === "") {
        newBoard[i][j] = "O";
        let score = minimaxAlgorithm(newBoard, true);
        newBoard[i][j] = "";
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  newBoard[move.i][move.j] = "O";
  console.log("===new board===", newBoard);
  return newBoard;
  // setMyBoard(newBoard);
  if (gameOver(newBoard)) {
    console.log("Game Over");
  }
};

const gameOver = (board: Board) => {
  let result = checkWinner(board);
  if (result !== "T" && result !== null) {
    return true;
  }
  return false;
};

const checkWinner = (board: Board) => {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== "" &&
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2]
    ) {
      winner = board[i][0];
    }
  }

  // vertical
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] !== "" &&
      board[0][i] === board[1][i] &&
      board[0][i] === board[2][i]
    ) {
      winner = board[0][i];
    }
  }

  // diagonal
  if (
    board[0][0] !== "" &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  ) {
    winner = board[0][0];
  }
  if (
    board[0][0] !== "" &&
    board[2][0] === board[1][1] &&
    board[2][0] === board[0][2]
  ) {
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
    return "Tie";
  } else {
    return winner;
  }
};

const minimaxAlgorithm = (newBoard: Board, playerTurn: boolean) => {
  let result = checkWinner(newBoard) as "X" | "O" | "Tie" | null;
  if (result !== null) {
    if (result === "Tie") {
      return 0;
    }
    if (result === "O") {
      return 1;
    } else {
      return -1;
    }
  }

  let cnt = 0;
  let score = 0;

  if (playerTurn) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (newBoard[i][j] === "") {
          newBoard[i][j] = "X";
          cnt++;
          score += minimaxAlgorithm(newBoard, false);
          newBoard[i][j] = "";
        }
      }
    }
    return score / cnt;
  } else {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (newBoard[i][j] === "") {
          newBoard[i][j] = "O";
          cnt++;
          score += minimaxAlgorithm(newBoard, true);
          newBoard[i][j] = "";
        }
      }
    }
    return score / cnt;
  }
};
