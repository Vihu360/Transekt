"use client"
import PolarChart from '@/app/components/polarChart';

interface GatewayData {
  gateway: string;
  amount: number;
  percentage: number;
}

interface GatewayComparisonProps {
  gatewayData: GatewayData[];
}

export default function GatewayComparison({ gatewayData }: GatewayComparisonProps) {
  // Process gateway data
  const processedData = gatewayData.map(item => ({
    label: item.gateway.charAt(0).toUpperCase() + item.gateway.slice(1),
    amount: item.amount,
    percentage: item.percentage
  }));

  const labels = processedData.map(item => item.label);
  const amounts = processedData.map(item => item.amount);

  // Color palette for different gateways
  const colors = [
    "rgba(30, 58, 138, 0.85)",  // Deep Navy Blue
    "rgba(37, 99, 235, 0.8)",   // Royal Blue
    "rgba(59, 130, 246, 0.75)", // Bright Azure
    "rgba(96, 165, 250, 0.7)",  // Sky Blue
    "rgba(147, 197, 253, 0.65)", // Light Blue
    "rgba(99, 102, 241, 0.8)",  // Indigo
    "rgba(139, 92, 246, 0.75)", // Purple
    "rgba(168, 85, 247, 0.7)"   // Violet
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Payment Gateway Usage',
        data: amounts,
        backgroundColor: colors.slice(0, labels.length),
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
        displayColors: true,
        callbacks: {
          title: function(context: { label: string }[]) {
            return context[0].label;
          },
          label: function(context: { dataIndex: number }) {
            const dataIndex = context.dataIndex;
            const item = processedData[dataIndex];
            return [
              `Amount: ₹${item?.amount?.toLocaleString() || 0}`,
              `Percentage: ${item?.percentage?.toFixed(1) || 0}%`
            ];
          }
        }
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
