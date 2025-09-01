"use client"
import PolarChart from '@/app/components/polarChart';

export default function GatewayComparison() {
  const labels = ['Razorpay', 'Paypal', 'PhonePe', 'Stripe', 'Cashfree'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Payment Gateway Usage',
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          "rgba(30, 58, 138, 0.85)",  // Deep Navy Blue
          "rgba(37, 99, 235, 0.8)",   // Royal Blue
          "rgba(59, 130, 246, 0.75)", // Bright Azure
          "rgba(96, 165, 250, 0.7)",  // Sky Blue
          "rgba(147, 197, 253, 0.65)" // Light Blue
        ],
        
        
        
        
      
        borderWidth: 1.5
      }
    ]
    
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 25,
          boxWidth: 15,
          font: {
            size: 12,
            family: 'Inter, system-ui, sans-serif'
          },
          color: '#475569' // slate-600
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#e2e8f0',
        borderColor: '#475569',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true
      }
    },
    layout: {
      padding: {
        top: 20,
        bottom: 15  // Reduced to remove extra space below labels
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        grid: {
          color: '#e2e8f0',
          lineWidth: 1
        },
        ticks: {
          display: false  // This removes the scale numbers (5, 10, 15, etc.)
        },
        pointLabels: {
          display: false  // This removes the axis labels
        }
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-md font-semibold text-gray-900">Payment Gateway Usage</h3>
      </div>
      
      {/* Chart */}
      <div className="flex-1 flex items-center justify-center">
        <PolarChart data={data} options={options} />
      </div>
    </div>
  );
}
