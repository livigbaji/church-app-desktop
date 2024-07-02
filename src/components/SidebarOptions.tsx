import React from "react";
import { Box, Stack, Button } from "@mui/material";

interface SidebarOptionsProps {
  text: string;
  startIcon: React.ReactNode;
  endIcon?: React.ReactNode; // Optional end icon
  textTransform?: React.CSSProperties["textTransform"];
  sx?: React.CSSProperties;
  active?: boolean; // New prop to indicate if the option is active
  onClick?: () => void; // Optional onClick handler
}

const SidebarOptions: React.FC<SidebarOptionsProps> = ({
  text,
  startIcon,
  endIcon,
  textTransform = "none",
  sx = {}, // Default to an empty object
  active = false, // Default to false
  onClick,
}) => {
  return (
    <Stack
      sx={{
        display: "flex",
        cursor: "pointer",
        padding: "20px",
        fontWeight: "400",
        fontSize: "16px",
        pl: "30px",
        backgroundColor: active ? "#FFFFFF26" : "transparent",
        color: active ? "white" : "inherit",
        borderRadius: active ? "20px" : "0",
        width: active ? "200px" : "auto",
        ":hover": {
          backgroundColor: "#FFFFFF26",
          color: "white",
          borderRadius: "20px",
          transition: "all 0.3s ease",
          width: "200px",
        },
        ...sx, // Spread the custom styles here
      }}
      onClick={onClick} // Attach onClick handler
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Button
          disableRipple
          color="inherit"
          startIcon={startIcon}
          endIcon={endIcon}
          sx={{ textTransform }}
        >
          {text}
        </Button>
      </Box>
    </Stack>
  );
};

export default SidebarOptions;
