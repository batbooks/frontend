import React from 'react'
import { useSharedState } from './SharedStateProvider'

const Button = () => {
    const {keyword}=useSharedState()
  return (
    <div></div>
  )
}

export default Button;