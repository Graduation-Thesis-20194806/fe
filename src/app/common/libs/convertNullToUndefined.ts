// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertNullToUndefined = (object: any) => {
  const newObj = { ...object }
  for (const key in newObj) {
    if (newObj[key] === null) {
      newObj[key] = undefined
    }
  }
  return newObj
}

export default convertNullToUndefined
