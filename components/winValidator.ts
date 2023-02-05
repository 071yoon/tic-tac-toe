export const winValidator = (board: Board, player: Player): boolean => {
  const win = board.reduce((acc, row) => {
    return acc && row.every((cell) => cell === player);
  }, true);

  return win;
};
