import { SizeType } from 'antd/es/config-provider/SizeContext'
import TextArea from 'antd/es/input/TextArea'
import {
  ChangeEventHandler,
  ForwardRefExoticComponent,
  ForwardedRef,
  KeyboardEventHandler,
  RefAttributes,
  forwardRef,
} from 'react'

type AppInputTextAreaProps = {
  value?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  rows?: number
  maxLength?: number
  placeholder?: string
  size?: SizeType
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined
  error?: string
  disabled?: boolean | undefined
  autoSize?: boolean
  className?: string
}

const AppInputTextArea: ForwardRefExoticComponent<
  AppInputTextAreaProps & RefAttributes<HTMLTextAreaElement>
> = forwardRef(
  (
    { error, ...rest }: AppInputTextAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return <TextArea ref={ref} {...rest} status={error ? 'error' : undefined} />
  }
)

AppInputTextArea.displayName = 'AppInputTextArea'

export default AppInputTextArea
