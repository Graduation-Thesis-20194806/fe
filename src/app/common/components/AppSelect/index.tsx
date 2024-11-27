import { Select } from 'antd'
import { FC } from 'react'

type AppSelectProps = {
  value: string | undefined
  onChange: (value: string) => void
  options: { label: string; value: string; disabled?: boolean }[]
  placeholder?: string
  error?: string
}

const AppSelect: FC<AppSelectProps> = ({ error = '', ...rest }) => {
  return (
    <Select
      {...rest}
      className="h-11 w-full"
      status={error ? 'error' : undefined}
    />
  )
}

export default AppSelect
