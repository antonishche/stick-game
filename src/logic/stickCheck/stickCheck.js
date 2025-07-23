const areInRow = (sticks) => {
    if (sticks.length < 2) return true;
    const sorted = sticks.sort((a, b) => a - b);
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] !== sorted[i - 1] + 1) {
        return false;
      }
    }
    return true;
  }

export const isDisabled = (selected, state) => {
  if (selected.length === 0) return true;

  switch (state.mode) {
    case 1:
      return selected.length > state.max;
    case 2:
      return selected.length < state.min || selected.length > state.max;
    case 3:
      return selected.length > state.max || !areInRow(selected);
    case 4:
      return (selected.length < state.min || selected.length > state.max) || 
             !areInRow(selected);
    case 5:
      return !([1, 2].includes(selected.length) || (selected.length === 3 && !areInRow(selected)));
    default:
      return true;
  }
}

export const handleStickClick = (index, state, selected, setSelected, setErr) => {

  if (state.winner) {
    setErr('Игра закончилась.');
    return
  }

  if (state.sticks[index] === 0 || state.currentPlayer !== 'player') return;

  const newSelected = selected.includes(index)
    ? selected.filter(i => i !== index)
    : [...selected, index];

  if (newSelected.length > state.max) {
    setErr('Уже выбрано максимальное количество палочек');
    return
  }

  if ([3, 4].includes(state.mode) && !areInRow(newSelected)) {
    setErr('Палочки должны идти подряд.');
    return
  }

  setErr(false);
  setSelected(newSelected);
};