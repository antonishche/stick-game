export const makePlayerMove = (state, positions) => {

  const sticks = [...state.sticks];
  const mode = state.mode;
  let whoWin = null;
  positions.forEach(pos => { sticks[pos] = 0 })
  const remaining = sticks.filter(s => s === 1).length;

  const noMovesLeft = (mode) => {
    if (remaining === 0) return 'player';
    else if (mode === 2 && (remaining > 0 && remaining < state.min)) {
      return 'player';
    } else if (mode === 4) {
      const groups = [];
      let currentGroup = [];

      sticks.forEach((stick, index) => {
        if (stick === 1) currentGroup.push(index);
        else if (currentGroup.length) {
          groups.push([...currentGroup]);
          currentGroup = [];
        }
      });
      if (currentGroup.length) groups.push(currentGroup);

      if (groups.some(group => group.length >= state.min)) return null
      else {
        return 'player'
      }
    }
    return null;
  }

  whoWin = noMovesLeft(mode);

  return {
    ...state,
    sticks,
    currentPlayer: 'computer',
    winner:  whoWin,
    restSticks: remaining
  };
};