import { Box, Typography } from "@mui/material";
import React from "react";

interface StatCardProps {
  count: number;
  title: string;
  Icon: React.ElementType;
  onClick?: () => void; // Add onClick prop
}

const StatCard: React.FC<StatCardProps> = ({ count, title, Icon, onClick }) => (
  <Box
    onClick={onClick} // Apply onClick prop
    sx={{
      display: "flex",
      padding: 2,
      alignItems: "center",
      bgcolor: "#FFFFFF",
      width: "256px",
      height: "106px",
      borderRadius: "5px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      cursor: onClick ? "pointer" : "default",
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

export default StatCard;
