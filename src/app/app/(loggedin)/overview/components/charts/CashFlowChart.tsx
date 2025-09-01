"use client"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";
import LineChart from '@/app/components/lineChart';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler);

export default function CashFlowChart() {

  const cashFlowLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const cashFlowData = {
    labels: cashFlowLabels,
    datasets: [
      {
        label: 'Cash Flow',
        data: [12000, 15000, 18000, 16000, 22000, 25000, 28000, 32000, 29000, 35000, 38000, 42000],
        borderColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return "#1D8CF8";
          const gradient = ctx.createLinearGradient(0, 0, chartArea.width, 0);
          gradient.addColorStop(0, "#27AE60"); // Bright Blue
          gradient.addColorStop(1, "#219150"); // Teal
          return gradient;
        },
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return "rgba(29,140,248,0.1)";
          const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.height);
          gradient.addColorStop(0, "rgba(29,140,248,0.25)"); // Blue fade
          gradient.addColorStop(1, "rgba(26,188,156,0.05)"); // Teal fade
          return gradient;
        },
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#27AE60", // Emerald green points
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#27AE60",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 2,
      }
    ]
  };

  const cashFlowOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        titleColor: '#1F2937',
        bodyColor: '#374151',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        titleFont: { size: 14, weight: '600' },
        bodyFont: { size: 13, weight: '500' },
        padding: 12,
        callbacks: {
          title: (context) => context[0].label,
          label: (context) => `Cash Flow: ₹${context.parsed.y.toLocaleString()}`
        }
      }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    layout: {
      padding: { top: 10, bottom: 10, left: 10, right: 10 }
    },
    interaction: { mode: 'index', intersect: false },
    elements: {
      line: { borderWidth: 2 },
      point: { radius: 0, hoverRadius: 6 }
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-md font-semibold text-gray-900">Cash Flow</h3>
        </div>
        <button className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
      
      {/* Chart */}
      <div className="flex-1">
        <LineChart data={cashFlowData} options={cashFlowOptions} />
      </div>
      
      {/* Summary */}
      <div className="flex items-center justify-between px-4">
        <div>
          <p className="text-lg font-bold text-gray-900">+₹4,465.00</p>
        </div>
        <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-medium">+12%</span>
        </div>
      </div>
    </div>
  );
}
