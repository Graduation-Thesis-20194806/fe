// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getValueFromLabel = <T extends { label: string; value: any }>(
  label: string,
  options: T[]
): T['value'] | undefined => {
  const option = options.find((option) => option.label === label)
  return option?.value
}

export default getValueFromLabel
