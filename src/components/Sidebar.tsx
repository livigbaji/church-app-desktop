import React, { useState } from "react";
import { Box, Stack, Collapse, List, ListItemButton } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import SidebarOptions from "./SidebarOptions";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import RememberMeOutlinedIcon from "@mui/icons-material/RememberMeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CakeIcon from "@mui/icons-material/Cake";

const menuItems = [
  { text: "Dashboard", icon: <DashboardOutlinedIcon />, path: "/" },
  { text: "Attendance", icon: <GroupsOutlinedIcon />, path: "/attendance" },
  {
    text: "Members",
    icon: <RememberMeOutlinedIcon />,
    path: "/members",
    subItems: [
      { text: "Birthdays", icon: <CakeIcon />, path: "/members/birthdays" },
    ],
  },
  { text: "Sub-Units", icon: <GroupOutlinedIcon />, path: "/subunits" },
  { text: "Profiles", icon: <PermIdentityOutlinedIcon />, path: "/profiles" },
];

const SideBar: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleMembersClick = () => {
    setOpen(!open);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

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
        <React.Fragment key={item.text}>
          <NavLink
            to={item.path}
            style={{ textDecoration: "none", color: "inherit" }}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <SidebarOptions
              text={item.text}
              startIcon={item.icon}
              endIcon={
                item.subItems ? (
                  open ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : undefined
              }
              sx={{ marginTop: index === 0 ? "40px" : 0 }}
              active={isActive(item.path)}
              onClick={item.subItems ? handleMembersClick : undefined}
            />
          </NavLink>
          {item.subItems && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.subItems.map((subItem) => (
                  <NavLink
                    key={subItem.text}
                    to={subItem.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <ListItemButton sx={{ pl: 4 }}>
                      <SidebarOptions
                        text={subItem.text}
                        startIcon={subItem.icon}
                        sx={{ paddingLeft: "20px" }}
                        active={isActive(subItem.path)}
                      />
                    </ListItemButton>
                  </NavLink>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
      <Box sx={{ flexGrow: 1 }} />
      <SidebarOptions
        text="Logout"
        startIcon={<MeetingRoomOutlinedIcon />}
        sx={{ marginBottom: "15px" }}
      />
    </Stack>
  );
};

export default SideBar;
