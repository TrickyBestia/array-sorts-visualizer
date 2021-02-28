import ArrayProxy from '../ArrayProxy';

export default function parse(
  code: string,
  arrayProxy: ArrayProxy,
): Iterator<undefined, undefined, undefined> | undefined {
  try {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    /* eslint-disable @typescript-eslint/no-unsafe-call */
    const sortIterator = eval(`(${code})`).call(
      undefined,
      arrayProxy,
    ) as Iterator<undefined, undefined, undefined>;
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
    /* eslint-enable @typescript-eslint/no-unsafe-call */
    return sortIterator;
  } catch {
    return undefined;
  }
}
