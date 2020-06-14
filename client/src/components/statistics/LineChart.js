import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart({ labels, data, label, title }) {
  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        borderColor: ['rgba(36, 151, 227, 0.3)'],
        backgroundColor: ['rgba(97, 189, 250, 0.3)'],
        pointBorderColor: 'rgba(2, 65, 107, 0.3)',
        pointBackgroundColor: 'rgba(2, 65, 107, 0.3)'
      }
    ]
  };

  const option = {
    title: {
      display: true,
      text: title
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            stepSize: 1
          }
        }
      ]
    }
  };
  return <Line data={chartData} options={option} />;
}

export default LineChart;
