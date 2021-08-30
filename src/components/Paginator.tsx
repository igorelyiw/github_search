import React from 'react'
import { Pagination } from 'antd'

interface Props {
  current: number
  total: number
  pageSize: number
  onChange: (num: number) => void
}

const Paginator = (props: Props) => {
  const { current, total, pageSize, onChange } = props
  return (
    <>
      <Pagination current={current} total={total} pageSize={pageSize} onChange={onChange} />
    </>
  )
}

export default Paginator
