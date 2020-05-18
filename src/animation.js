const interpolators = {
  number(from, to, factor) {
    if (from === to) {
      return to;
    }
    if (from == null) {
      return to;
    }
    if (to == null) {
      return from;
    }
    return from + (to - from) * factor;
  },
};

export function interpolateNumberArray(from, to, factor) {
  if (typeof from === 'number' && typeof to === 'number') {
    return interpolators.number(from, to, factor);
  }
  if (Array.isArray(from) && Array.isArray(to)) {
    return to.map((t, i) => interpolators.number(from[i], t, factor));
  }
  return to;
}

export function interpolateKdeCoords(from, to, factor) {
  if (Array.isArray(from) && Array.isArray(to)) {
    return to.map((t, i) => ({
      v: interpolators.number(from[i] ? from[i].v : null, t.v, factor),
      estimate: interpolators.number(from[i] ? from[i].estimate : null, t.estimate, factor),
    }));
  }
  return to;
}
