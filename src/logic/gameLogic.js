export const initializeGame = (obj) => ({
  sticks: Array(obj.n).fill(1),
  currentPlayer: obj.firstPlayer,
  winner: null,
  restSticks: obj.n,
  max: obj.max,
  min: obj.min,
  mode: obj.mode
});

export const makePlayerMove = (state, positions) => {

  const sticks = [...state.sticks];

  positions.forEach((pos) => {
    sticks[pos] = 0;
  });

  const remaining = sticks.filter(s => s === 1).length

  return {
    ...state,
    sticks: sticks,
    currentPlayer: 'computer',
    winner: remaining === 0 ? 'player' : null,
    restSticks: remaining
  };
};

export const makeComputerMove = (state) => {
  const sticks = [...state.sticks];
  const taken = [];
  const total = sticks.filter(s => s === 1).length;
  let toTake;

  if (state.mode === 1) {
    toTake = total % (state.max + 1) || 1;
  } else if (state.mode === 2){
    toTake = total % (state.max + state.min);
    toTake = Math.max(state.min, Math.min(toTake, state.max));
    toTake = toTake > state.restSticks ? state.restSticks : toTake;
  }

  for (let i = 0; i < sticks.length && toTake > 0; i++) {
    if (sticks[i] === 1) {
      sticks[i] = 0;
      taken.push(i);
      toTake--;
    }
  }

  const remaining = sticks.filter(s => s === 1).length;
  
  return {
    ...state,
    sticks,
    currentPlayer: 'player',
    winner: remaining === 0 ? 'computer' : null,
    restSticks: remaining
  };
};

export const validateMove = (state, positions) => {
  if (positions.some((p) => p < 0 || p >= state.sticks.length || state.sticks[p] === 0)) return false;
  const count = positions.length;
  if (state.mode === 1) {
    if (count < 1 || count > state.max) return false;
  } else if (state.mode === 2) {
    if ((count < state.min && count !== state.restSticks) || count > state.max) return false;
  }
  return new Set(positions).size === count;
};
