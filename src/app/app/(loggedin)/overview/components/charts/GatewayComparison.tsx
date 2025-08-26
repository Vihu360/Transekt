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
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 205, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(54, 162, 235, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
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
    <div className="w-full h-[400px] flex items-center justify-center">
      <PolarChart data={data} options={options} />
    </div>
  );
}
