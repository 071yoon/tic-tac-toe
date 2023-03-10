import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { minimax, checkWinner } from "./minimax";
import X from "public/assets/x.svg";
import O from "public/assets/o.svg";

export type Board = Array<Array<string>>;

export default function Board() {
  const [board, setBoard] = useState<Board>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const onClickBoard = ({
    event,
    position,
  }: {
    event: React.MouseEvent<HTMLDivElement, MouseEvent>;
    position: { i: number; j: number };
  }) => {
    event.preventDefault();
    if (board[position.i][position.j] !== "") return;
    const newBoard = [...board];
    newBoard[position.i][position.j] = "X";
    setBoard(newBoard);
    if (checkWinner(newBoard) === "X") {
      setTimeout(() => {
        alert("X win");
        setBoard([
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ]);
      }, 500);
      return;
    } else if (checkWinner(newBoard) === "Tie") {
      setTimeout(() => {
        alert("Tie");
        setBoard([
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ]);
      }, 500);
      return;
    }
    setTimeout(() => {
      runMiniMax();
    }, 100);
  };

  const runMiniMax = useCallback(() => {
    const minimaxBoard = minimax(board);
    setBoard(minimaxBoard);
    if (checkWinner(minimaxBoard) === "O") {
      setTimeout(() => {
        alert("O win");
        setBoard([
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ]);
      }, 500);
    } else if (checkWinner(minimaxBoard) === "Tie") {
      setTimeout(() => {
        alert("Tie");
        setBoard([
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ]);
      }, 500);
      return;
    }
  }, [board]);

  return (
    <div>
      {board.map((row, i) => (
        <SingleRow key={i}>
          {row.map((cell, j) => (
            <SingleBox
              key={j}
              position={{ i, j }}
              onClick={(e) => onClickBoard({ event: e, position: { i, j } })}
            >
              {cell ? cell === "X" ? <X /> : <O /> : null}
            </SingleBox>
          ))}
        </SingleRow>
      ))}
    </div>
  );
}

const SingleRow = styled.div`
  display: flex;
`;

const SingleBox = styled.div<{ position: { i: number; j: number } }>`
  width: 100px;
  height: 100px;
  border-right: ${(props) => (props.position.j !== 2 ? "1px solid black" : "")};
  border-bottom: ${(props) =>
    props.position.i !== 2 ? "1px solid black" : ""};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  svg {
    object-fit: fill;
  }
`;
