import { FC } from 'react'

type TitleWrapperProps = {
  label: string
  className?: string
  error?: string
  children: React.ReactNode
  isRequired?: boolean
}

const TitleWrapper: FC<TitleWrapperProps> = ({
  label,
  className,
  children,
  error = '',
  isRequired = false,
}) => {
  return (
    <div className={className}>
      <p className="font-medium text-sm text-[#4c4c4c] mb-[6px]">
        {label}
        {isRequired && (
          <span className="text-[#ff4d4f] text-[10px] pl-2">*</span>
        )}
      </p>
      {children}
      {error && (
        <p className="text-[#ff4d4f] text-xs leading-5 min-h-5 my-[2px]">
          {error}
        </p>
      )}
    </div>
  )
}

export default TitleWrapper
