export const fourthMode = (state, sticks) => {
  const { max, min } = state;

  const allGroups = [];
  let currentGroup = [];

  sticks.forEach((stick, index) => {
    if (stick === 1) currentGroup.push(index);
    else if (currentGroup.length) {
      allGroups.push([...currentGroup]);
      currentGroup = []
    }
  });
  if (currentGroup.length) allGroups.push(currentGroup);

  const groups = allGroups.filter(group => group.length >= min);
  let foundMove = false;

  for (let group of groups) {
    const groupLength = group.length;

    for (let start = 0; start < groupLength - min; start++) {
      for (let take = min; take <= Math.min(max, groupLength - start); take++) {

        const newGroups = groups.filter(g => g !== group);
        if (start > 0) newGroups.push(group.slice(0, start));
        if (start + take < groupLength) newGroups.push(group.slice(start + take));

        const checkedGroups = newGroups.filter(group => group.length >= min)
        const newXOR = checkedGroups.reduce((sum, group) => sum ^ group.length, 0);

        if (newXOR === 0) {
          for (let i = 0; i < take; i++) {
            const pos = group[start + i];
            sticks[pos] = 0;
          }
          foundMove = true;
          break;
        }
      }
      if (foundMove) break;
    }
    if (foundMove) break;
  }

  if (!foundMove) {
    const biggestGroup = groups.reduce((maxGroup, group) =>
      group.length > maxGroup.length ? group : maxGroup, []);

    for (let i = 0; i < min; i++) {
      sticks[biggestGroup[i]] = 0;
    }
  }
}