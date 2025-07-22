export const initializeGame = (obj) => ({
  sticks: Array(obj.n).fill(1),
  currentPlayer: obj.firstPlayer,
  winner: null,
  restSticks: obj.n,
  max: obj.max,
  min: obj.min,
  mode: obj.mode
});
