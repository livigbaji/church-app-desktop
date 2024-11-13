import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import CustomSpeedDial from "./CustomSpeedDial";
import SearchField from "@/components/SerachField";

const Attendance: React.FC = () => {
  return (
    <Box>
      <Header pageTitle="Attendance" />
      <SearchField
        onSearch={(value: string) => console.log("Search for:", value)}
      />

      <CustomSpeedDial actions={[]} />
    </Box>
  );
};

export default Attendance;
