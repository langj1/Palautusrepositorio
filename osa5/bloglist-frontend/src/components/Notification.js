import React from 'react'

const Notification = ({ message, error }) => {

  if (error) return (
    <div style={{ color: 'red' }}>
      {message}
    </div>
  )
  return (
    <div style={{ color: 'green' }}>
      {message}
    </div>
  )
}

export default Notification
