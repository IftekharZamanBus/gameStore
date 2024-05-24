import { Alert } from 'antd'
import React from 'react'

const Message = ({message, description, type}) => {
  return (
    <Alert message={message} description={description} type={type} showIcon closable />
  )
}

export default Message