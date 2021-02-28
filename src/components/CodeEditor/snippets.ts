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
      yield undefined;
      arrayProxy.secondaryIndex = j + 1;
      yield undefined;
      if (arrayProxy.compare() > 0) {
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
];
export default snippets;
