import { Input } from 'antd'
import { InputRef, PasswordProps } from 'antd/es/input'
import clsx from 'clsx'
import {
  ChangeEventHandler,
  ForwardRefExoticComponent,
  ForwardedRef,
  forwardRef,
  RefAttributes,
  useMemo,
} from 'react'

type AppInputProps = {
  value: string | undefined
  onChange: ChangeEventHandler<HTMLInputElement>
  className?: string
  placeholder?: string
  maxLength?: number
  disabled?: boolean
  type?: 'text' | 'password'
  error?: string
}

const AppInput: ForwardRefExoticComponent<
  AppInputProps & RefAttributes<InputRef>
> = forwardRef(
  (
    { className, error, type = 'text', ...rest }: AppInputProps,
    ref: ForwardedRef<InputRef>
  ) => {
    const { InputComponent, inputProps } = useMemo(() => {
      let InputComponent: ForwardRefExoticComponent<
        PasswordProps & RefAttributes<InputRef>
      > = Input
      let inputProps: PasswordProps = {}
      if (type === 'password') {
        InputComponent = Input.Password
        inputProps = {
          visibilityToggle: true,
        }
      }
      return { InputComponent, inputProps }
    }, [type])

    return (
      <InputComponent
        ref={ref}
        {...rest}
        className={clsx('h-11', className)}
        status={error ? 'error' : undefined}
        {...inputProps}
      />
    )
  }
)

AppInput.displayName = 'AppInput'

export default AppInput
