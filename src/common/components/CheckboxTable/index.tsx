'use client'
import clsx from 'clsx'
import { FC, useCallback, useMemo } from 'react'

export type CheckboxTableValue = {
  col: string
  row: string
}

type CheckboxTableProps = {
  rows: string[]
  cols: string[]
  value: Array<CheckboxTableValue>
  onChange: (value: Array<CheckboxTableValue>) => void
  className?: string
}

const CheckboxTable: FC<CheckboxTableProps> = ({
  rows,
  cols,
  value,
  onChange,
}) => {
  const dataRender = useMemo(() => {
    const data: Array<{
      type: 'button-col' | 'button-row' | 'checkbox'
      label?: string
      value?: CheckboxTableValue
    } | null> = [null]
    cols.forEach((col) => {
      data.push({
        type: 'button-col',
        label: col,
      })
    })
    rows.forEach((row) => {
      data.push({
        type: 'button-row',
        label: row,
      })
      cols.forEach((col) => {
        data.push({
          type: 'checkbox',
          value: { col, row },
        })
      })
    })
    return data
  }, [cols, rows])

  const handleCheck = useCallback(
    (selected: CheckboxTableValue) => {
      let nextValue = []
      if (
        value?.some(
          (check) => check.col === selected.col && check.row === selected.row
        )
      ) {
        nextValue = value?.filter(
          (item) => item.col !== selected.col || item.row !== selected.row
        )
      } else {
        nextValue = [...value, selected]
      }
      onChange(nextValue)
    },
    [value, onChange]
  )

  const handleClickCol = useCallback(
    (label: string, isFull: boolean) => {
      let nextValue = []
      if (isFull) {
        nextValue = value?.filter((check) => check.col !== label)
      } else {
        const addChecks: CheckboxTableValue[] = []
        rows.forEach((row) => {
          if (
            !value?.some((check) => check.col === label && check.row === row)
          ) {
            addChecks.push({ col: label, row })
          }
        })
        nextValue = [...value, ...addChecks]
      }
      onChange(nextValue)
    },
    [value, rows, onChange]
  )

  const handleClickRow = useCallback(
    (label: string, isFull: boolean) => {
      let nextValue = []
      if (isFull) {
        nextValue = value?.filter((check) => check.row !== label)
      } else {
        const addChecks: CheckboxTableValue[] = []
        cols.forEach((col) => {
          if (
            !value?.some((check) => check.row === label && check.col === col)
          ) {
            addChecks.push({ row: label, col })
          }
        })
        nextValue = [...value, ...addChecks]
      }
      onChange(nextValue)
    },
    [value, cols, onChange]
  )

  const handleClickAll = useCallback(
    (isFull: boolean) => {
      let nextValue: Array<CheckboxTableValue> = []
      if (!isFull) {
        const addChecks: CheckboxTableValue[] = []
        cols.forEach((col) => {
          rows.forEach((row) => {
            if (
              !value?.some((check) => check.col === col && check.row === row)
            ) {
              addChecks.push({ col, row })
            }
          })
        })
        nextValue = [...value, ...addChecks]
      }
      onChange(nextValue)
    },
    [onChange, value, cols, rows]
  )

  return (
    <div
      className="grid border py-4 px-4 rounded-[10px]"
      style={{
        gridTemplateColumns: `repeat(${cols.length + 1}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows.length + 1}, minmax(0, 1fr))`,
      }}
    >
      {dataRender.map((data) => {
        if (!data) {
          const isFull = value?.length === cols.length * rows.length
          return (
            <div
              key={data}
              className="flex gap-1 justify-center items-center md:flex-row flex-col md:min-w-[60px]  min-w-[45px]"
            >
              <input
                type="checkbox"
                className="h-4 w-4 mr-1"
                checked={isFull}
                onChange={handleClickAll.bind(this, isFull)}
              />
              <p className="text-[12px] md:text-sm text-[#475467]">すべて</p>
            </div>
          )
        } else if (data.type === 'button-col') {
          const isFull =
            value?.filter((check) => check.col === data.label).length ===
            rows.length
          return (
            <div key={data.label} className="flex justify-center items-center">
              <div
                className={clsx(
                  'w-8 md:w-10 h-8 md:h-10 rounded-lg flex justify-center items-center',
                  isFull ? 'bg-[var(--primary-color)] text-white' : 'border text-[#98A2B3]'
                )}
                onClick={handleClickCol.bind(this, data.label!, isFull)}
              >
                {data.label}
              </div>
            </div>
          )
        } else if (data.type === 'button-row') {
          const isFull =
            value?.filter((check) => check.row === data.label).length ===
            cols.length
          return (
            <div key={data.label} className="flex justify-center items-center">
              <div
                className={clsx(
                  'md:min-w-[60px] min-w-[50px] h-6 rounded-lg my-4 text-sm flex justify-center items-center',
                  isFull ? 'bg-[var(--primary-color)] text-white' : 'bg-[#D0D5DD]'
                )}
                onClick={handleClickRow.bind(this, data.label!, isFull)}
              >
                {data.label}
              </div>
            </div>
          )
        } else if (data.type === 'checkbox') {
          const checked = value?.some(
            (check) =>
              check.col === data.value?.col && check.row === data.value.row
          )
          return (
            <div
              key={`${data.value?.col} - ${data.value?.row}`}
              className="flex justify-center items-center"
            >
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer"
                checked={checked}
                onChange={handleCheck.bind(this, data.value!)}
              />
            </div>
          )
        }
      })}
    </div>
  )
}

export default CheckboxTable
