import { Button, Pagination } from 'antd'
import React from 'react'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'

type PaginationProps = {
  totalPage: number
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}

const AppPagination = ({
  totalPage,
  currentPage,
  setCurrentPage,
  pageSize,
}: PaginationProps) => {
  const handlePreviousPage = () => {
    setCurrentPage((prev) => {
      if (prev === 1) {
        return prev
      }
      return prev - 1
    })
  }
  const handleNextPage = () => {
    setCurrentPage((prev) => {
      if (totalPage === prev) {
        return prev
      }
      return prev + 1
    })
  }

  const handleOnchange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="flex justify-between w-full bg-white px-6 py-3">
      <Button
        onClick={handlePreviousPage}
        className="flex items-center px-3"
        disabled={totalPage === 1}
      >
        <ArrowLeftOutlined />
        <div className="hidden md:block md:pl-3">戻る</div>
      </Button>
      <Pagination
        className="hidden md:block"
        total={totalPage * pageSize}
        current={currentPage}
        showSizeChanger={false}
        pageSize={pageSize}
        onChange={handleOnchange}
      />
      <div className="md:hidden">
        {currentPage} / {totalPage}
      </div>
      <Button
        onClick={handleNextPage}
        className="flex items-center px-3"
        disabled={currentPage === totalPage}
      >
        <div className="hidden md:block md:pr-3">次へ</div>
        <ArrowRightOutlined />
      </Button>
    </div>
  )
}

export default AppPagination
