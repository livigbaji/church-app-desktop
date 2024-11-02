import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface CustomSpeedDialProps {
  iconColor?: string;
  actions: { icon: React.ReactNode; tooltipTitle: string }[];
}

// eslint-disable-next-line no-empty-pattern
const CustomSpeedDial: React.FC<CustomSpeedDialProps> = ({}) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleAddMemberClick = () => {
    navigate("/members/newmember"); // Navigate to the new member route
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial example"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
      FabProps={{
        sx: {
          bgcolor: "#132034",
        },
      }}
    >
      <SpeedDialAction
        icon={<PersonAddIcon />}
        tooltipTitle="Add new member"
        onClick={handleAddMemberClick}
      />
    </SpeedDial>
  );
};

export default CustomSpeedDial;
