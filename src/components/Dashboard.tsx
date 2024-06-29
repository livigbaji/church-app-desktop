import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Header from "./Header";
import Linegraph from "./charts/Linegraph";
import Piechart from "./charts/Piechart";
import { PeopleAlt, Group, EventBusy, Cake } from "@mui/icons-material";

const statistics = [
  { label: "Total Members", value: 35, icon: <PeopleAlt fontSize="large" /> },
  { label: "Total Sub-Units", value: 8, icon: <Group fontSize="large" /> },
  { label: "Absent Last Week", value: 5, icon: <EventBusy fontSize="large" /> },
  { label: "Upcoming Birthdays", value: 2, icon: <Cake fontSize="large" /> },
];

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: "20px", overflowY: "auto" }}>
      <Header pageTitle="Dashboard" />
      <Grid container spacing={2}>
        {statistics.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper sx={{ padding: 3, display: "flex", alignItems: "center" }}>
              <Box sx={{ marginRight: 1 }}>{stat.icon}</Box>
              <div>
                <Typography variant="h6" sx={{ textAlign: "left" }}>
                  {stat.value}
                </Typography>
                <Typography variant="subtitle1" sx={{ textAlign: "left" }}>
                  {stat.label}
                </Typography>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h6">Total Attendance Report</Typography>
            <Linegraph />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h6">Males vs Females</Typography>
            <Piechart />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
