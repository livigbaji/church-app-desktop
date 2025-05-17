import React from "react";
import { Box } from "@mui/material";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Attendance from "./components/Attendance";
import Members from "./components/Members";
import SubUnit from "./components/SubUnit";
import Profiles from "./components/Profiles";
import Birthdays from "./components/Birthdays";
import CreateMember from "./components/forms/CreateMember";
import CreateUnits from "@/components/forms/CreateUnits";
import Reports from "./components/Reports";
import Journal from "./components/Journal";

const App: React.FC = () => {
  const routes = [
    { path: "/", element: <Dashboard /> },
    { path: "/attendance", element: <Attendance /> },
    { path: "/members", element: <Members /> },
    { path: "/birthdays", element: <Birthdays /> },
    { path: "/members/newmember", element: <CreateMember /> },
    { path: "/subunits", element: <SubUnit /> },
    { path: "/subunits/add-unit", element: <CreateUnits /> },
    { path: "/profiles", element: <Profiles /> },
    { path: "/reports", element: <Reports /> },
    { path: "/Journal", element: <Journal /> },
  ];

  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          bgColor: "#F5F5F5",
        }}
      >
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
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
