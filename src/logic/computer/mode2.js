export const secondMode = (state) => {
    const rest = state.restSticks % (state.max + state.min);
    return Math.max(state.min, Math.min(rest, state.max));
}