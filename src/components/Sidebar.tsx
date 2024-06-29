import React from "react";
import { Box, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import SidebarOptions from "./SidebarOptions";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import RememberMeOutlinedIcon from "@mui/icons-material/RememberMeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";

const menuItems = [
  { text: "Dashboard", icon: <DashboardOutlinedIcon />, path: "/" },
  { text: "Attendance", icon: <GroupsOutlinedIcon />, path: "/attendance" },
  { text: "Members", icon: <RememberMeOutlinedIcon />, path: "/members" },
  { text: "Sub-Units", icon: <GroupOutlinedIcon />, path: "/subunits" },
  { text: "Profiles", icon: <PermIdentityOutlinedIcon />, path: "/profiles" },
];

const SideBar: React.FC = () => {
  return (
    <Stack
      sx={{
        backgroundColor: "#132034",
        color: "white",
        width: "269px",
        height: "100vh",
      }}
    >
      {menuItems.map((item, index) => (
        <NavLink
          key={item.text}
          to={item.path}
          style={{ textDecoration: "none", color: "inherit" }}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {({ isActive }) => (
            <SidebarOptions
              text={item.text}
              startIcon={item.icon}
              sx={{ marginTop: index === 0 ? "40px" : 0 }} // Move the first button down
              active={isActive} // Pass the active state
            />
          )}
        </NavLink>
      ))}
      <Box sx={{ flexGrow: 1 }} />
      {/* Logout Button */}
      <SidebarOptions
        text="Logout"
        startIcon={<MeetingRoomOutlinedIcon />}
        sx={{ marginBottom: "15px" }} // Move the logout button up
      />
    </Stack>
  );
};

export default SideBar;
