"use client"
import BarChart from '@/app/components/barChart';

export default function DayWiseSuccessFailure() {
  const labels = Array.from({ length: 12 }, (_, i) => `Aug ${i + 1}`); // Aug 1 to Aug 15
  
const chartData = {
  labels: labels,
  datasets: [
    {
      label: 'Success Payments',
      data: [90, 75, 80, 60, 70, 85, 95, 50, 65, 80, 90, 75, 60, 70, 85],
      backgroundColor: 'rgba(59, 130, 246, 0.5)', // Light blue, transparent
      borderColor: 'rgba(37, 99, 235, 0.8)',     // Medium blue
      borderWidth: 0,
      borderRadius: { topLeft: 50, topRight: 50, bottomLeft: 0, bottomRight: 0 },
      borderSkipped: false,
    },
    {
      label: 'Failure Payments',
      data: [20, 30, 25, 15, 20, 18, 22, 10, 15, 20, 25, 18, 15, 20, 18],
      backgroundColor: 'rgba(16, 165, 245, 0.4)', // Sky blue, transparent
      borderColor: 'rgba(3, 105, 161, 0.6)',     // Darker blue
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
        position: 'top',
        align: 'center',
        labels: {
          usePointStyle: true,
          pointStyle: 'rect',
          padding: 20,
          boxWidth: 15,
          boxHeight: 15,
          font: {
            size: 12,
            family: 'Arial, sans-serif'
          },
          color: '#666'
        }
      },
      title: {
        display: true,
        text: 'Success vs Failure Comparison',
        font: {
          size: 16,
          weight: 'normal'
        },
        color: '#333',
        padding: {
          bottom: 20
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: 'rgba(200, 200, 200, 0.3)',
          lineWidth: 1
        },
        ticks: {
          color: '#666',
          font: {
            size: 11
          }
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          display: true,
          color: 'rgba(200, 200, 200, 0.3)',
          lineWidth: 1
        },
        ticks: {
          stepSize: 10,
          color: '#666',
          font: {
            size: 11
          }
        }
      }
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      }
    },
    elements: {
      bar: {
        borderWidth: 0
      }
    }
  };

  return (
    <div className='w-full h-[400px]'>
      <BarChart data={chartData} options={chartOptions} />
    </div>
  );
}
