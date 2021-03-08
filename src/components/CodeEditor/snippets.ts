const snippets: { name: string; value: string }[] = [
  {
    name: 'default',
    value: 'function* sort(arrayProxy) {\n  \n}',
  },
  {
    name: 'bubble sort',
    value: `function* sort(arrayProxy) {
  for (let i = 0; i < arrayProxy.array.length - 1; i++) {
    let wasSwap = false;
    for (let j = 0; j < arrayProxy.array.length - 1 - i; j++) {
      arrayProxy.primaryIndex = j;
      arrayProxy.secondaryIndex = j + 1;
      yield undefined;
      if (arrayProxy.compare() === 1) {
        yield undefined;
        arrayProxy.swap();
        wasSwap = true;
      }
      yield undefined;
    }
    if (!wasSwap) break;
  }
}`,
  },
  {
    name: 'comb sort',
    value: `function* sort(arrayProxy) {
  const gapShrinkFactor = 1.247;
  let gap = Math.floor(arrayProxy.array.length / gapShrinkFactor);
  while (gap > 0) {
    for (let i = 0; i + gap < arrayProxy.array.length; i++) {
      arrayProxy.primaryIndex = i;
      arrayProxy.secondaryIndex = i + gap;
      if (arrayProxy.compare() === 1) {
        yield undefined;
        arrayProxy.swap();
      }
      yield undefined;
    }
    gap = Math.floor(gap / gapShrinkFactor);
  }
}`,
  },
];
export default snippets;
