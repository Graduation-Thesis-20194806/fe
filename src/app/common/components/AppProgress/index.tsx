import { LoadingOutlined } from '@ant-design/icons'
import { Progress } from 'antd'
import React from 'react'

type ProgressProps = { percent: number }

const AppProgress = ({ percent }: ProgressProps) => {
  return (
    <Progress
      percent={percent}
      className={`${percent >= 80 ? 'pink-progress-text' : percent <= 60 ? 'gray-progress-text' : 'green-progress-text'}`}
      format={(percent) =>
        percent !== 0 ? `${percent}%` : <LoadingOutlined />
      }
    />
  )
}

export default AppProgress
