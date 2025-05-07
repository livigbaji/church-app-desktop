import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import AssignmentIndSharpIcon from "@mui/icons-material/AssignmentIndSharp";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CreateUnits from "@/components/forms/CreateUnits";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const drawerWidth = 269;

const navigationItems = [
  { text: "DashBoard", icon: <DashboardCustomizeOutlinedIcon />, path: "/" },
  { text: "Attendance", icon: <TrendingUpOutlinedIcon />, path: "/attendance" },
  { text: "Members", icon: <GroupOutlinedIcon />, path: "/members" },
  { text: "Sub-Units", icon: <GroupAddOutlinedIcon />, path: "/subunits" },
  { text: "Profiles", icon: <AssignmentIndSharpIcon />, path: "/profiles" },
];

const subUnitItems = [
  {
    text: "Add Unit",
    path: "/subunits/add-unit",
    component: <CreateUnits />,
    icon: <AddCircleOutlineIcon />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [subUnitAnchorEl, setSubUnitAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleSubUnitMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSubUnitAnchorEl(event.currentTarget);
  };

  const handleSubUnitMenuClose = () => {
    setSubUnitAnchorEl(null);
  };

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
          {navigationItems.map((item, index) =>
            item.text === "Sub-Units" ? (
              <div key={index}>
                <ListItem
                  component={NavLink}
                  to={item.path}
                  sx={{
                    backgroundColor: location.pathname.startsWith(item.path)
                      ? "rgba(255, 255, 255, 0.1)"
                      : "inherit",
                    "&.active": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      padding: "20px",
                      fontWeight: "bold",
                    },
                    "&:hover": { cursor: "pointer" },
                    color: "#FFFFFF",
                    padding: "20px",
                    maxWidth: "203px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <ListItemIcon sx={{ color: "#FFFFFF" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                  <IconButton
                    onClick={(event) => {
                      event.preventDefault();
                      handleSubUnitMenuOpen(event);
                    }}
                    sx={{ padding: 0 }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </ListItem>
                <Menu
                  anchorEl={subUnitAnchorEl}
                  open={Boolean(subUnitAnchorEl)}
                  onClose={handleSubUnitMenuClose}
                >
                  {subUnitItems.map((subUnit, subIndex) => (
                    <MenuItem key={subIndex} onClick={handleSubUnitMenuClose}>
                      <ListItemIcon sx={{ minWidth: "40px" }}>
                        {subUnit.icon}
                      </ListItemIcon>
                      <Button
                        component={NavLink}
                        to={subUnit.path}
                        style={{ textDecoration: "none", color: "inherit" }}
                        sx={{ width: "100%", justifyContent: "flex-start" }}
                      >
                        {subUnit.text}
                      </Button>
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ) : (
              <ListItem
                key={index}
                component={NavLink}
                to={item.path}
                sx={{
                  backgroundColor:
                    location.pathname === item.path
                      ? "rgba(255, 255, 255, 0.1)"
                      : "inherit",
                  "&.active": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    padding: "20px",
                    fontWeight: "bold",
                  },
                  "&:hover": { cursor: "pointer" },
                  color: "#FFFFFF",
                  padding: "20px",
                  maxWidth: "203px",
                }}
              >
                <ListItemIcon sx={{ color: "#FFFFFF" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            )
          )}
        </List>
        <Button
          onClick={() => console.log("Logged out")}
          variant="text"
          color="error"
          startIcon={<LogoutOutlinedIcon />}
          fullWidth
          sx={{
            mt: "auto",
            mb: 2,
            color: "#FFFFFF",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
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
