import React from "react";
import { Box, Stack, Button } from "@mui/material";

interface SidebarOptionsProps {
  text: string;
  startIcon: React.ReactNode;
  textTransform?: React.CSSProperties["textTransform"];
  sx?: React.CSSProperties;
  active?: boolean; // New prop to indicate if the option is active
}

const SidebarOptions: React.FC<SidebarOptionsProps> = ({
  text,
  startIcon,
  textTransform = "none",
  sx = {}, // Default to an empty object
  active = false, // Default to false
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
    >
      <Box>
        <Button
          disableRipple
          color="inherit"
          startIcon={startIcon}
          sx={{ textTransform }}
        >
          {text}
        </Button>
      </Box>
    </Stack>
  );
};

export default SidebarOptions;
