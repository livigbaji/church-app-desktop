import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "./Header";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import TableViewOutlinedIcon from "@mui/icons-material/TableViewOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import CustomSpeedDial from "./CustomSpeedDial";
import { getAllMembers } from "@/services/memberService";
import { getTotalUnits, getUpcomingBirthdays } from "@/services/unitService";
import PieChart from "./charts/Piechart";
import Linegraph from "./charts/Linegraph";
import StatCard from "./StatCard";

const Dashboard: React.FC = () => {
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalUnits, setTotalUnits] = useState(0);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const members = await getAllMembers();
        const units = await getTotalUnits("");
        const birthdays = await getUpcomingBirthdays(10);

        setTotalMembers(members.length);
        setTotalUnits(units.length);
        setUpcomingBirthdays(birthdays.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Header pageTitle={"Dashboard"} />

      {/* Stat Cards Section */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 3,
          mb: 4,
        }}
      >
        <StatCard
          count={totalMembers}
          title="TOTAL MEMBERS"
          Icon={Groups2OutlinedIcon}
          onClick={() => navigate("/members")}
        />
        <StatCard
          count={totalUnits || 0}
          title="TOTAL SUB-UNITS"
          Icon={TableViewOutlinedIcon}
          onClick={() => navigate("/subunits")}
        />
        <StatCard
          count={0}
          title="ABSENT LAST WEEK"
          Icon={HighlightOffOutlinedIcon}
          // onClick={() => navigate("/absent-members")}
        />
        <StatCard
          count={upcomingBirthdays || 0}
          title="UPCOMING BIRTHDAYS"
          Icon={CakeOutlinedIcon}
          // onClick={() => navigate("/birthdays")}
        />
      </Box>

      {/* Charts Section */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 3,
          mt: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: "#FFFFFF",
            p: 3,
            borderRadius: "5px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: "#000" }}>
            Total Attendance Report
          </Typography>
          <Linegraph />
        </Box>

        <Box
          sx={{
            bgcolor: "#FFFFFF",
            p: 3,
            borderRadius: "5px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: "#000" }}>
            Males vs Females
          </Typography>
          <PieChart />
        </Box>
      </Box>

      <CustomSpeedDial actions={[]} />
    </Box>
  );
};

export default Dashboard;
