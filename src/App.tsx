import React from "react";
import { Box } from "@mui/material";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Attendance from "./components/Attendance";
import Members from "./components/Members";
import SubUnit from "./components/SubUnit";
import Profiles from "./components/Profiles";
import Birthdays from "./components/Birthdays"; // Import the Birthdays component
import AddMember from "./components/AddMember";

const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ display: "flex", height: "100vh", bgcolor: "#F5F5F5" }}>
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
            <Route path="/members/birthdays" element={<Birthdays />} />
            <Route path="/members/newmember" element={<AddMember />} />
            <Route path="/subunits" element={<SubUnit />} />
            <Route path="/profiles" element={<Profiles />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
