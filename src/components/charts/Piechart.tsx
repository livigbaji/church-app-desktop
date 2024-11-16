import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { getAllMembers } from "@/services/memberService";

const COLORS = ["#132034", "#D3D3D3"];

const GenderPieChart: React.FC = () => {
  const [data, setData] = useState([
    { name: "Male", value: 0 },
    { name: "Female", value: 0 },
  ]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const members = await getAllMembers();

        // Count the number of male and female members
        const maleCount = members.filter(
          (member) => member.gender === "MALE"
        ).length;
        const femaleCount = members.filter(
          (member) => member.gender === "FEMALE"
        ).length;

        // Update the data state with the counts
        setData([
          { name: "Male", value: maleCount },
          { name: "Female", value: femaleCount },
        ]);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GenderPieChart;
