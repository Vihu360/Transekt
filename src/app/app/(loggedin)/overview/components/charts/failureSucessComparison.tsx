"use client"
import BarChart from '@/app/components/barChart';
import { useState } from 'react';

export default function DayWiseSuccessFailure() {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // State for toggling data series
  const [showSuccess, setShowSuccess] = useState(true);
  const [showFailure, setShowFailure] = useState(true);
  
const chartData = {
  labels: labels,
  datasets: [
    ...(showSuccess ? [{
      label: 'Success Payments',
      data: [45, 52, 68, 55, 48, 62, 75, 82, 58, 65, 72, 60],
      backgroundColor: '#2563EB', // Professional blue
      borderColor: '#3B82F6',
      borderWidth: 0,
      borderRadius: 4,
      borderSkipped: false,
    }] : []),
    ...(showFailure ? [{
      label: 'Failure Payments',
      data: [12, 18, 22, 15, 20, 16, 25, 28, 18, 22, 24, 19],
      backgroundColor: '#DC2626', // Professional green
      borderColor: '#10B981',
      borderWidth: 0,
      borderRadius: 4,
      borderSkipped: false,
    }] : [])
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
            return context[0].label;
          },
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}`;
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
        max: 100,
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
          stepSize: 20,
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
            <h3 className='text-lg font-semibold text-gray-900'>Success vs Failure Comparison</h3>
            <p className='text-sm text-gray-500 mt-1'>Monthly payment performance overview</p>
          </div>
          <div className='flex items-center space-x-4'>
            {/* Interactive Legend */}
            <div className='flex items-center space-x-4'>
              <button 
                onClick={() => setShowSuccess(!showSuccess)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  showSuccess 
                    ? 'bg-blue-50 text-[#2563EB] border border-blue-200' 
                    : 'bg-gray-50 text-gray-400 border border-gray-200'
                }`}
              >
                <div className={`w-3 h-3 rounded ${showSuccess ? 'bg-[#2563EB]' : 'bg-gray-300'}`}></div>
                <span className='text-sm font-medium'>Success</span>
              </button>
              <button 
                onClick={() => setShowFailure(!showFailure)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  showFailure 
                    ? 'bg-red-50 text-[#DC2626] border border-red-200' 
                    : 'bg-gray-50 text-gray-400 border border-gray-200'
                }`}
              >
                <div className={`w-3 h-3 rounded ${showFailure ? 'bg-[#DC2626]' : 'bg-gray-300'}`}></div>
                <span className='text-sm font-medium'>Failure</span>
              </button>
            </div>
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
