import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart: React.FC = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Active Members',
        data: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85], // Dummy data for active members in each month
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div>
      <h2>Active Members by Month</h2>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
