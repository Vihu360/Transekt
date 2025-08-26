import { useEffect, useRef } from 'react';
import { Chart, PolarAreaController, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(PolarAreaController, RadialLinearScale, ArcElement, Tooltip, Legend);

export default function PolarChart({ data, options }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    const chartInstance = new Chart(ctx, {
      type: 'polarArea',
      data: data,
      options: options
    });

    return () => {
      chartInstance.destroy();
    };
  }, [data, options]);

  return <canvas ref={chartRef}></canvas>;
}
