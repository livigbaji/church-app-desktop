import React from "react";
import Chart from "react-apexcharts";

const Piechart: React.FC = () => {
  const options = {
    labels: ["Males", "Females"],
    colors: ["#132034", "#808080"], // Set colors here, grey color code is #808080
  };

  const series = [44, 55];

  return <Chart options={options} series={series} type="donut" height={350} />;
};

export default Piechart;
