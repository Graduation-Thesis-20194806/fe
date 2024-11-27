import { InputNumber } from 'antd'
import {
  ForwardRefExoticComponent,
  ForwardedRef,
  ReactNode,
  RefAttributes,
  forwardRef,
} from 'react'

type AppInputNumberProps = {
  value?: number
  onChange: (value: number | null) => void
  placeholder?: string
  disabled?: boolean
  error?: string
  suffix?: ReactNode
  min?: number
}

const AppInputNumber: ForwardRefExoticComponent<
  AppInputNumberProps & RefAttributes<HTMLInputElement>
> = forwardRef(
  (
    { error = '', ...rest }: AppInputNumberProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <InputNumber
        ref={ref}
        {...rest}
        className="h-11 w-full"
        size="large"
        status={error ? 'error' : undefined}
        min={0}
        controls={false}
      />
    )
  }
)

AppInputNumber.displayName = 'AppInputNumber'

export default AppInputNumber
