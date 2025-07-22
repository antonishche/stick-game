import { firstMode } from './mode1';
import { secondMode } from './mode2';
import { thirdMode } from './mode3';

export const makeComputerMove = (state) => {
    const sticks = [...state.sticks];
    const taken = [];
    let toTake = 1;
  
    if (state.mode === 1) {
      toTake = firstMode(state);
    } 
    
    else if (state.mode === 2) {
      toTake = secondMode(state);
    } 

    else if (state.mode === 3) {
      toTake = thirdMode(state, sticks, taken)
    }
  
    if ([1, 2].includes(state.mode)) {
      for (let i = 0; i < sticks.length && toTake > 0; i++) {
        if (sticks[i] === 1) {
          sticks[i] = 0;
          taken.push(i);
          toTake--;
        }
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