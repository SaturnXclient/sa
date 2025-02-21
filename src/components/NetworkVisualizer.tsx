import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

interface Packet {
  source: string;
  destination: string;
  protocol: string;
  size: number;
  timestamp: number;
}

interface NetworkVisualizerProps {
  data: Packet[];
}

const NetworkVisualizer: React.FC<NetworkVisualizerProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const timestamps = data.map(packet => packet.timestamp);
    const packetSizes = data.map(packet => packet.size);

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timestamps,
        datasets: [{
          label: 'Network Traffic',
          data: packetSizes,
          borderColor: 'rgb(147, 51, 234)',
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(147, 51, 234, 0.1)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)'
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'rgba(255, 255, 255, 0.7)'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="h-96 bg-[#12122a] rounded-lg p-4">
      <canvas ref={chartRef} />
    </div>
  );
};

export default NetworkVisualizer;