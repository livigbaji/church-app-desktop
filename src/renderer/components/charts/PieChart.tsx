import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart: React.FC = () => {
  const data = {
    labels: ['Present & Serving', 'Absent'],
    datasets: [
      {
        label: 'Attendance Status',
        data: [75, 25], // Dummy data for percentage of present & serving vs absent
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverOffset: 4
      }
    ]
  };

  return (
    <div>
      <h2>Attendance Status</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
