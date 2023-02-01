import styled from "@emotion/styled";

export default function Board() {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  return (
    <div>
      {board.map((row, i) => (
        <SingleRow key={i}>
          {row.map((cell, j) => (
            <SingleBox key={j} position={{ i, j }}>
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
