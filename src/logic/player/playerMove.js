export const makePlayerMove = (state, positions) => {

  const sticks = [...state.sticks];
  positions.forEach(pos => {sticks[pos] = 0})
  const remaining = sticks.filter(s => s === 1).length;
  
    return {
      ...state,
      sticks,
      currentPlayer: 'computer',
      winner: remaining === 0 ? 'player' : null,
      restSticks: remaining
    };
  };