import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import TableViewOutlinedIcon from "@mui/icons-material/TableViewOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import CustomSpeedDial from "./CustomSpeedDial";

// Function to fetch total members
const getTotalMembers = async (search: string) => {
  return window.backend.invoke("get:members", { search });
};

// Function to fetch total units
const getTotalUnits = async (search: string) => {
  return window.backend.invoke("get:units", { search });
};

// Function to fetch upcoming birthdays
const getUpcomingBirthdays = async (search: string) => {
  return window.backend.invoke("birthdays:member", search);
};

// const doStuff = (name: string) => {
//   if (!name || typeof name !== "string" || name.trim() === "") {
//     console.error("Invalid name provided.");
//     return;
//   }

//   window.ipcRenderer
//     .invoke("doStuff", { name })
//     .then((response) => {
//       if (response.success) {
//         console.log("Stuff:", response);
//       } else {
//         console.error("Error:", response.error);
//       }
//     })
//     .catch((error) => {
//       console.error("Error invoking doStuff:", error);
//     });
// };

// doStuff("John Doe");

// Reusable StatCard Component
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
        const members = await getTotalMembers("");
        const units = await getTotalUnits("");
        const birthdays = await getUpcomingBirthdays("");

        setTotalMembers(members.length);
        setTotalUnits(units.length);
        setUpcomingBirthdays(birthdays.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("total members:", totalMembers);
  console.log("total units:", totalUnits);
  console.log("Upcoming birthdays", upcomingBirthdays);

  return (
    <Box>
      <Header pageTitle={"Dashboard"} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // specify 4 columns with equal width
          gap: 3,
        }}
      >
        <StatCard
          count={totalMembers}
          title="TOTAL MEMBERS"
          Icon={Groups2OutlinedIcon}
        />
        <StatCard
          count={totalUnits}
          title="TOTAL SUB-UNITS"
          Icon={TableViewOutlinedIcon}
        />
        <StatCard
          count={0}
          title="ABSENT LAST WEEK"
          Icon={HighlightOffOutlinedIcon}
        />
        <StatCard
          count={upcomingBirthdays}
          title="UPCOMING BIRTHDAYS"
          Icon={CakeOutlinedIcon}
        />
      </Box>

      {/* Charts component */}
      <Box>Charts</Box>

      {/* SpeedDial component */}
      <CustomSpeedDial actions={[]} />
    </Box>
  );
};

export default Dashboard;
