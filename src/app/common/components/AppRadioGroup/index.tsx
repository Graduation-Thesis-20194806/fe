import { Radio, RadioChangeEvent } from 'antd'
import { FC } from 'react'

type AppRadioGroupProps = {
  value: string | boolean | undefined
  options: { label: string; value: string | boolean | undefined }[]
  onChange: (e: RadioChangeEvent) => void
}

const AppRadioGroup: FC<AppRadioGroupProps> = ({
  value,
  options,
  onChange,
}) => {
  return (
    <Radio.Group
      onChange={onChange}
      value={value}
      className="flex w-full gap-1 md:gap-4 lg:gap-7 h-11 items-center"
    >
      {options.map((option, index) => (
        <Radio key={index} value={option.value}>
          {option.label}
        </Radio>
      ))}
    </Radio.Group>
  )
}

export default AppRadioGroup
