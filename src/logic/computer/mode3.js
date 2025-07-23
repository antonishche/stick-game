export const thirdMode = (state, sticks) => {
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

    const XOR = groups.reduce((sum, group) => sum ^ group.length, 0);

    let foundMove = false;

    for (const group of groups) {
      const groupLength = group.length;

      for (let start = 0; start < groupLength; start++) {
        for (let take = 1; take <= Math.min(state.max, groupLength - start); take++) {
          
          const newGroups = groups.filter(g => g !== group);
          if (start > 0) newGroups.push(group.slice(0, start));
          if (start + take < groupLength) newGroups.push(group.slice(start + take));
          
          const newXOR = newGroups.reduce((sum, group) => sum ^ group.length, 0);
          
          if (newXOR === 0) {
            for (let i = 0; i < take; i++) {
              const pos = group[start + i];
              sticks[pos] = 0;
              // taken.push(pos);
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
      
      if (biggestGroup.length > 0) {
        sticks[biggestGroup[0]] = 0;
        // taken.push(biggestGroup[0]);
      }
    }
}