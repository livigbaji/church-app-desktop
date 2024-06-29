import React from "react";
import { Box } from "@mui/material";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Attendance from "./components/Attendance";
import Members from "./components/Members";
import SubUnit from "./components/SubUnit";
import Profiles from "./components/Profiles";

const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflowY: "auto",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/members" element={<Members />} />
            <Route path="/subunits" element={<SubUnit />} />
            <Route path="/profiles" element={<Profiles />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
