import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register the required components
Chart.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Male', 'Female'],
  datasets: [
    {
      label: 'Attendance',
      data: [60, 40], // Example data: 60 males and 40 females
      backgroundColor: ['rgba(19, 32, 52, 1)', 'rgba(22, 91, 170, 1)'],
      borderColor: ['rgba(19, 32, 52, 1)', 'rgba(22, 91, 170, 1)'],
      borderWidth: 1,
    },
  ],
};

const PieChart = () => {
  return (
    <div>
      <h6>Male vs Female Attendance</h6>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
