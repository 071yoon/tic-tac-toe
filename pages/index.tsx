import type { NextPage } from "next";
import Board from "../components/Board";
import styled from "@emotion/styled";

const Home: NextPage = () => {
  return (
    <Screen>
      <Board />
    </Screen>
  );
};

export default Home;

const Screen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
