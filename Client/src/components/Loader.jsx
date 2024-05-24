import { Spin } from 'antd'
import React from 'react'

const Loader = ({loading}) => {
  return (
    <Spin size='large' fullscreen tip="Loading..." spinning={loading} />
  )
}

export default Loader