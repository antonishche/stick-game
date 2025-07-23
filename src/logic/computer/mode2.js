export const secondMode = (state) => {
    const { restSticks, min, max } = state;

    for (let rest = 0; rest < min; rest++) {
        for (let take = min; take <= max; take++) {
            if ((restSticks - take) % (min + max) === rest) {
                return take;
            }
        }
    }
    return min
  };