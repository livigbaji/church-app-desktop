import React from "react";
import Chart from "react-apexcharts";

const Linegraph: React.FC = () => {
  const options = {
    chart: {
      id: "attendance-report",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    colors: ["#165BAA"], // Set line color here
  };

  const series = [
    {
      name: "Attendance",
      data: [30, 40, 35, 50, 49, 60],
    },
  ];

  return <Chart options={options} series={series} type="line" height={350} />;
};

export default Linegraph;
