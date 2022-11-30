function isNonNil<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

// Takes array or nil and returns array with original items without nil values
function removeNilValues<TValue>(
  arr: Readonly<Array<TValue | null | undefined> | null | undefined>
) {
  return arr?.filter(isNonNil) ?? [];
}

function castNilValues<TValue>(
  arr: Readonly<Array<TValue | null | undefined> | null | undefined>
) {
  return arr as Array<TValue>;
}

export { isNonNil, removeNilValues, castNilValues };
