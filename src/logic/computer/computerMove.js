import { firstMode } from './mode1';
import { secondMode } from './mode2';
import { thirdMode } from './mode3';
import { fourthMode } from './mode4';

export const makeComputerMove = (state) => {
  const sticks = [...state.sticks];
  let toTake = 1;
  const mode = state.mode;
  let whoWin = null;

  switch (state.mode) {
    case 1:
      toTake = firstMode(state);
      break;
    case 2:
      toTake = secondMode(state);
      break;
    case 3:
      thirdMode(state, sticks);
      break;
    case 4:
      fourthMode(state, sticks);
      break;
    default:
      break;
  }

  if ([1, 2].includes(state.mode)) {
    for (let i = 0; i < sticks.length && toTake > 0; i++) {
      if (sticks[i] === 1) {
        sticks[i] = 0;
        toTake--;
      }
    }
  }

  const remaining = sticks.filter(s => s === 1).length;

  const noMovesLeft = (mode) => {
    if (remaining === 0) return 'computer';
    else if (mode === 2 && (remaining > 0 && remaining < state.min)) {
      return 'computer';
    } else if (mode === 4) {
      const groups = [];
      let currentGroup = [];

      sticks.forEach((stick, index) => {
        if (stick === 1) currentGroup.push(index);
        else if (currentGroup.length) {
          groups.push([...currentGroup]);
          currentGroup = []
        }
      });
      if (currentGroup.length) groups.push(currentGroup);

      if (!groups.some(group => group.length >= state.min)) return 'computer'
    }
    return null;
  }
  
  whoWin = noMovesLeft(mode);

  return {
    ...state,
    sticks,
    currentPlayer: 'player',
    winner: whoWin,
    restSticks: remaining
  };
};