// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLabelFromValue = <T extends { label: string; value: any }>(
  value: T['value'],
  options: T[]
): string | undefined => {
  const option = options.find((option) => option.value === value)
  return option?.label
}

export default getLabelFromValue
