import React from 'react'
import DailyTransactionsChart from './charts/DailyTransactionsChart'

interface ChartProps {
  dailyTransactions: Array<{
    date: string;
    day_name: string;
    transaction_count: number;
  }>;
}

const Chart = ({ dailyTransactions }: ChartProps) => {
  return (
    <div className='w-full h-full flex items-end'>
      <DailyTransactionsChart dailyTransactions={dailyTransactions} />
    </div>
  )
}

export default Chart