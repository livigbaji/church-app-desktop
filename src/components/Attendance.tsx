import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
// import SearchField from "./SerachField";
import CustomSpeedDial from "./CustomSpeedDial";

const Attendance: React.FC = () => {
  return (
    <Box>
      <Header pageTitle="Attendance" />
      TODO: Update attendance logic
      {/*<SearchField*/}
      {/*  onSearch={function (value: string): void {*/}
      {/*    throw new Error("Function not implemented.");*/}
      {/*  }}*/}
      {/*/>*/}
      <CustomSpeedDial actions={[]} />
    </Box>
  );
};

export default Attendance;
