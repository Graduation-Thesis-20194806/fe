import { MONTH_FORMAT } from '@/common/constants'
import { DatePicker } from 'antd'
import clsx from 'clsx'
import { Dayjs } from 'dayjs'
import { ComponentProps, FC } from 'react'

type AppRangePickerProps = {
  value: [Dayjs, Dayjs] | undefined
  onChange: ComponentProps<typeof DatePicker.RangePicker>['onChange']
  className?: string
  picker?: 'week' | 'month' | 'quarter' | 'year'
  error?: string
}

const { RangePicker } = DatePicker

const AppRangePicker: FC<AppRangePickerProps> = ({
  className,
  error,
  ...rest
}) => {
  return (
    <RangePicker
      {...rest}
      allowEmpty={[false, true]}
      className={clsx('h-11', className)}
      placeholder={['入社年月', '退社年月']}
      format={MONTH_FORMAT}
      status={error ? 'error' : undefined}
    />
  )
}

export default AppRangePicker
