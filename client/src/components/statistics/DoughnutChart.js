import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function randomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

function DoughnutChart({ labels, label, data, title }) {
  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: labels.map(() => randomRGB())
      }
    ]
  };

  const option = {
    title: {
      display: true,
      text: title
    }
  };

  return <Doughnut data={chartData} options={option} />;
}

export default DoughnutChart;
