import { DATE_FORMAT, MONTH_FORMAT } from '@/common/constants'
import { DatePicker } from 'antd'
import clsx from 'clsx'
import { Dayjs } from 'dayjs'
import { FC } from 'react'

type AppDatePickerProps = {
  value: Dayjs | undefined
  onChange: (date: Dayjs, dateString: string | string[]) => void
  placeholder?: string
  picker?: 'date' | 'week' | 'month' | 'quarter' | 'year'
  className?: string
  error?: string
}

const AppDatePicker: FC<AppDatePickerProps> = ({
  className,
  error,
  placeholder = '',
  picker = 'month',
  ...rest
}) => {
  return (
    <DatePicker
      {...rest}
      picker={picker}
      className={clsx('w-full h-11', className)}
      placeholder={placeholder}
      format={picker === 'month' ? MONTH_FORMAT : DATE_FORMAT}
      status={error ? 'error' : undefined}
    />
  )
}

export default AppDatePicker
