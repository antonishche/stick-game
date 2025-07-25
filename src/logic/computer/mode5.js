import { countGroups, findThreeInRow, generateMoves, applyMove, getMaxDepth, grundy, memo } from '../functions/functions'


export const fifthMode = (state) => {
  Object.keys(memo).forEach(key => delete memo[key]);

  const sticks = state.sticks;
  const stickCount = sticks.reduce((sum, s) => sum + s, 0);
  const groupCount = countGroups(sticks);
  const maxDepth = getMaxDepth(stickCount, groupCount);
  const moves = generateMoves(sticks);

  let bestMove = null;
  let bestValue = -Infinity;

  for (const move of moves) {
    const newSticks = applyMove(sticks, move);
    const g = grundy(newSticks, 0, maxDepth);
    // console.log('Ход: ' + move, 'g: ' + g);
    const value = -g;
    if (value > bestValue) {
      bestValue = value;
      bestMove = move;
    }
  }


  if (!bestMove && moves.length > 0) {
    bestMove = findThreeInRow(sticks) || moves[0];
  }

  return bestMove || [];
};