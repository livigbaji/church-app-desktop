// Dashboard.tsx
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import TableViewOutlinedIcon from "@mui/icons-material/TableViewOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import CustomSpeedDial from "./CustomSpeedDial";
import { getAllMembers } from "@/services/memberService";
import { getTotalUnits, getUpcomingBirthdays } from "@/services/unitService";

interface StatCardProps {
  count: number;
  title: string;
  Icon: React.ElementType;
}

const StatCard: React.FC<StatCardProps> = ({ count, title, Icon }) => (
  <Box
    sx={{
      display: "flex",
      padding: 2,
      alignItems: "center",
      bgcolor: "#FFFFFF",
      width: "256px",
      height: "106px",
      borderRadius: "5px",
    }}
  >
    <Icon style={{ height: 30, width: 30 }} />
    <Box sx={{ marginLeft: 2 }}>
      <Typography
        sx={{
          color: "#000000",
          fontWeight: 700,
          fontSize: "25px",
        }}
      >
        {count}
      </Typography>
      <Typography
        sx={{
          font: "inter",
          fontSize: "14px",
          fontWeight: 400,
          color: "#525252",
        }}
      >
        {title}
      </Typography>
    </Box>
  </Box>
);

const Dashboard: React.FC = () => {
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalUnits, setTotalUnits] = useState(0);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState(0);

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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 3,
        }}
      >
        <StatCard
          count={totalMembers}
          title="TOTAL MEMBERS"
          Icon={Groups2OutlinedIcon}
        />
        <StatCard
          count={totalUnits || 0}
          title="TOTAL SUB-UNITS"
          Icon={TableViewOutlinedIcon}
        />
        <StatCard
          count={0}
          title="ABSENT LAST WEEK"
          Icon={HighlightOffOutlinedIcon}
        />
        <StatCard
          count={upcomingBirthdays || 0}
          title="UPCOMING BIRTHDAYS"
          Icon={CakeOutlinedIcon}
        />
      </Box>

      <Box>Charts</Box>
      <CustomSpeedDial actions={[]} />
    </Box>
  );
};

export default Dashboard;
