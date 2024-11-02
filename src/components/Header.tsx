import Typography from "@mui/material/Typography";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Box from "@mui/material/Box";

interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 5,
        mt: 2,
      }}
    >
      <div>
        <Typography sx={{ fontWeight: "bold" }} variant="h5" color="initial">
          Technical Unit Attendance
        </Typography>

        <Typography variant="body1" color="#525252">
          {pageTitle}
        </Typography>
      </div>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          color="#000000"
          sx={{ mr: 1, font: "Inter", fontWeight: 700, fontSize: "16px" }}
        >
          Admin
        </Typography>
        <AdminPanelSettingsIcon />
      </Box>
    </Box>
  );
};

export default Header;
