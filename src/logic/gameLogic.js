export const initializeGame = (n, firstPlayer) => ({
    sticks: Array(n).fill(1),
    currentPlayer: firstPlayer,
    winner: null,
    restSticks: n
  });
  
  export const makePlayerMove = (state, positions) => {
    const newSticks = [...state.sticks];
    positions.forEach((pos) => {
      newSticks[pos] = 0;
    });
    const remaining = newSticks.reduce((sum, s) => sum + s, 0);
    return {
      ...state,
      sticks: newSticks,
      currentPlayer: 'computer',
      winner: remaining === 0 ? 'player' : null,
      restSticks: remaining
    };
  };
  
  export const makeComputerMove = (state, k) => {
    const numSticks = state.sticks.reduce((sum, s) => sum + s, 0);
    let rest = numSticks % (k + 1) !== 0 ? numSticks % (k + 1) : 1;
    const newSticks = [...state.sticks];
    const positions = [];
    for (let i = 0; i < newSticks.length && rest > 0; i++) {
      if (newSticks[i] === 1) {
        newSticks[i] = 0;
        positions.push(i);
        rest--;
      }
    }
    const remaining = newSticks.reduce((sum, s) => sum + s, 0);
    return {
      ...state,
      sticks: newSticks,
      currentPlayer: 'player',
      winner: remaining === 0 ? 'computer' : null,
      restSticks: remaining
    };
  };
  
  export const validateMove = (state, positions, k) => {
    const count = positions.length;
    if (count < 1 || count > k) return false;
    if (positions.some((p) => p < 0 || p >= state.sticks.length || state.sticks[p] === 0)) return false;
    return new Set(positions).size === count;
  };
  