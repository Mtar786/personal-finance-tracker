import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function ChartComponent({ expenses }) {
  // Aggregate totals by category
  const totals = {};
  expenses.forEach((exp) => {
    totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
  });

  const data = {
    labels: Object.keys(totals),
    datasets: [
      {
        label: 'Spending by Category',
        data: Object.values(totals),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div style={{ height: '400px', marginBottom: '20px' }}>
      <h2>Spending by Category</h2>
      {Object.keys(totals).length === 0 ? (
        <p>No data to display.</p>
      ) : (
        <Pie data={data} options={options} />
      )}
    </div>
  );
}

export default ChartComponent;