export const validateMove = (state, positions) => {

  if (positions.some(p => p < 0 || p >= state.sticks.length || state.sticks[p] === 0)) return false;

  const unicPositions = new Set(positions).size;
  const numPos = positions.length;
  
  if (unicPositions !== numPos) return false;
  
  return true;
};