type ComputeRange<
  N extends number,
  Result extends Array<unknown> = [],
> = Result["length"] extends N
  ? Result
  : ComputeRange<N, [...Result, Result["length"]]>;

export type ClientErrorStatus = Exclude<
  ComputeRange<500>[number],
  ComputeRange<400>[number]
>;
export type ServerErrorStatus = Exclude<
  ComputeRange<600>[number],
  ComputeRange<500>[number]
>;

export function deepMerge<T>(target: T, source: T): T {
  if (!target) target = {} as T; // Ensure target is an object

  for (const key in source) {
    if (source[key] instanceof Object && target[key] instanceof Object) {
      target[key] = deepMerge(target[key], source[key]); // Recursively merge
    } else {
      target[key] = source[key]; // Directly assign primitive values
    }
  }
  return target;
}

