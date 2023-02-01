import React, { useState } from "react";
import styled from "@emotion/styled";

export default function Board() {
  const [myTurn, setMyTurn] = useState(true);
  const [board, setBoard] = useState([
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
    if (myTurn) {
      const newBoard = [...board];
      newBoard[position.i][position.j] = "X";
      setBoard(newBoard);
      setMyTurn(false);
    } else {
      const newBoard = [...board];
      newBoard[position.i][position.j] = "O";
      setBoard(newBoard);
      setMyTurn(true);
    }
  };

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
              {cell}
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
`;
