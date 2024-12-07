import { FC } from 'react'
import CheckableTag from 'antd/es/tag/CheckableTag'

type AppCheckableTagGroupProps = {
  options: { label: string; value: string | number }[]
  value: string | number | (string | number)[] | undefined
  onChange: (value: string | number | (string | number)[] | undefined) => void
  className?: string
  type?: 'multiple' | 'single'
}

const AppCheckableTagGroup: FC<AppCheckableTagGroupProps> = ({
  options,
  value,
  onChange,
  className,
  type = 'multiple',
}) => {
  const handleChange = (tag: string | number, checked: boolean) => {
    let nextSelectedTags
    if (type === 'single') {
      nextSelectedTags = checked ? tag : undefined
    } else if (type === 'multiple') {
      if (value === undefined && checked) {
        nextSelectedTags = [tag]
      } else if (Array.isArray(value)) {
        nextSelectedTags = checked
          ? [...value, tag]
          : value.filter((t) => t !== tag)
      }
    }
    onChange(nextSelectedTags)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((tag) => (
        <CheckableTag
          key={tag.value}
          checked={
            value === undefined
              ? false
              : type === 'multiple' && Array.isArray(value)
                ? value.includes(tag.value)
                : value === tag.value
          }
          onChange={(checked) => handleChange(tag.value, checked)}
          className={className}
        >
          {tag.label}
        </CheckableTag>
      ))}
    </div>
  )
}

export default AppCheckableTagGroup
