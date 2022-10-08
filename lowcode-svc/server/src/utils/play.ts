export const SessionMap = new Map<string, string>();

export const findKey = (obj: Map<string, string>, value: string) => {
  for (let [_key, _value] of obj) {
    if (_value === value) {
      return _key;
    }
  }
};
