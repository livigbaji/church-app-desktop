import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import AssignmentIndSharpIcon from "@mui/icons-material/AssignmentIndSharp";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const drawerWidth = 269;

const navigationItems = [
  { text: "DashBoard", icon: <DashboardCustomizeOutlinedIcon />, path: "/" },
  { text: "Attendance", icon: <TrendingUpOutlinedIcon />, path: "/attendance" },
  { text: "Members", icon: <GroupOutlinedIcon />, path: "/members" },
  { text: "Sub-Units", icon: <GroupAddOutlinedIcon />, path: "/subunits" },
  { text: "Profiles", icon: <AssignmentIndSharpIcon />, path: "/profiles" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#132034",
          },
        }}
      >
        <List
          sx={{
            pt: "100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {navigationItems.map((item, index) => (
            <ListItem
              key={index}
              component={NavLink}
              to={item.path}
              sx={{
                backgroundColor:
                  location.pathname === item.path ? "red" : "inherit",
                "&.active": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  padding: "20px",
                  fontWeight: "bold",
                },
                "&:hover": {
                  cursor: "pointer",
                },
                color: "#FFFFFF",
                padding: "20px",
                maxWidth: "203px",
              }}
            >
              <ListItemIcon sx={{ color: "#FFFFFF" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Button
          variant="text"
          color="error"
          startIcon={<LogoutOutlinedIcon />}
          sx={{
            mt: "auto",
            mb: 2,
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          Log out
        </Button>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          zIndex: 1,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Sidebar;
