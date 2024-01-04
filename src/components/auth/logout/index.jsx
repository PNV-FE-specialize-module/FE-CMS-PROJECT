import React from 'react'
import Login from '../login'

export const Logout = () => {
  // Temporary
  localStorage.removeItem("user");
  return (
    <></>
  )
}
