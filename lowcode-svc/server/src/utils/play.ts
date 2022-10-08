export const findKey = (obj: Map<string, string>, value: string) => {
  for (let [_key, _value] of obj) {
    console.log(_key);
    if (_value === value) {
      return _key;
    }
  }
};
