import React from 'react'
import FailureSucessComparison from './charts/failureSucessComparison'

const Chart = () => {
  return (
    <div className='w-full h-full flex items-end'>
      <FailureSucessComparison />
    </div>
  )
}

export default Chart