import { Button } from 'antd'
import { CSSProperties, FC, MouseEventHandler, ReactNode, useMemo } from 'react'
import clsx from 'clsx'
import { ButtonHTMLType, ButtonType } from 'antd/es/button'

type AppButtonProps = {
  text: string
  onClick?: MouseEventHandler<HTMLElement>
  className?: string
  type?: ButtonType
  htmlType?: ButtonHTMLType
  disabled?: boolean
  loading?: boolean
  icon?: ReactNode
}

const AppButton: FC<AppButtonProps> = ({
  text,
  onClick: handleClick,
  className,
  type = 'primary',
  htmlType,
  disabled,
  loading,
  icon,
}) => {
  const custom = useMemo(() => {
    let style: CSSProperties = {
      borderWidth: 0,
    }
    let className = 'w-full text-white font-semibold text-base h-11'
    switch (type) {
      case 'primary':
        style = {
          ...style,
          backgroundColor: '#40509E',
        }
        break
      case 'link':
        className = 'text-[#1890FF] font-normal text-sm p-0'
        break
      case 'default':
        style = {
          ...style,
          backgroundColor: '#FFFFFF',
          color: '#40509E',
          borderColor: '#40509E',
          borderWidth: '1px',
        }
        break
    }
    return { style, className }
  }, [type])

  return (
    <Button
      type={type}
      style={custom.style}
      className={clsx(custom.className, className)}
      onClick={handleClick}
      htmlType={htmlType}
      disabled={disabled}
      loading={loading}
      icon={icon}
    >
      <div>{text} </div>
    </Button>
  )
}

export default AppButton
