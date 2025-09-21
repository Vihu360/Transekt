"use client"
import BarChart from '@/app/components/barChart';

interface DailyTransaction {
  date: string;
  day_name: string;
  transaction_count: number;
}

interface DailyTransactionsChartProps {
  dailyTransactions: DailyTransaction[];
}

export default function DailyTransactionsChart({ dailyTransactions }: DailyTransactionsChartProps) {
  // Process the data to get the last 7 days or available data
  const processedData = dailyTransactions.slice(-7).map(item => ({
    label: item.day_name,
    date: item.date,
    count: item.transaction_count
  }));

  const labels = processedData.map(item => item.label);
  
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Daily Transactions',
        data: processedData.map(item => item.count),
        backgroundColor: '#2563EB', // Professional blue
        borderColor: '#3B82F6',
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend since it's in the header
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        titleColor: '#1F2937',
        bodyColor: '#374151',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          size: 14,
          weight: '600'
        },
        bodyFont: {
          size: 13,
          weight: '500'
        },
        padding: 12,
        callbacks: {
          title: function(context) {
            const dataIndex = context[0].dataIndex;
            return processedData[dataIndex]?.date || context[0].label;
          },
          label: function(context) {
            return `Transactions: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
            weight: '500'
          },
          padding: 8
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(107, 114, 128, 0.1)',
          lineWidth: 1,
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          stepSize: 1,
          color: '#6B7280',
          font: {
            size: 12,
            weight: '500'
          },
          padding: 8
        }
      }
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
      }
    },
    elements: {
      bar: {
        borderWidth: 0,
        borderRadius: 4
      }
    }
  };

  return (
    <div className='w-full bg-white overflow-hidden flex flex-col gap-5'>
      {/* Chart Header */}
      <div className='px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-lg font-semibold text-gray-900'>Daily Transactions</h3>
            <p className='text-sm text-gray-500 mt-1'>Last 7 days transaction volume</p>
          </div>
          <div className='flex items-center space-x-2'>
            <div className='w-3 h-3 rounded bg-[#2563EB]'></div>
            <span className='text-sm font-medium text-gray-700'>Transactions</span>
          </div>
        </div>
      </div>
      
      {/* Chart Container */}
      <div className='w-full h-[420px] flex flex-col items-end justify-end'>
        <div className='w-full h-full flex flex-col items-end'>
          <BarChart data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

