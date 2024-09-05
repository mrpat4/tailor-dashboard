interface Params {
  [key: string]: any;
}

export default function removeNullObjectValue(params: Params): Params {
  return Object.entries(params).reduce((prev, [key, value]) => {
    return value ? { ...prev, [key]: value } : prev;
  }, {});
}
