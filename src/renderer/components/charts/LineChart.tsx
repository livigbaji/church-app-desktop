import { Chart, CategoryScale, LinearScale, LineElement, PointElement, LineController, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the required components
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, LineController, Title, Tooltip, Legend);

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Total Attendance Report",
      backgroundColor: "rgba(19, 32, 52, 1)",
      borderColor: "rgba(22, 91, 170, 1)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false, // Allow the chart to resize freely
};

const LineChart = () => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
