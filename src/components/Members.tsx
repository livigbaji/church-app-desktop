import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Header from "./Header";

const rows = [
  { id: 1, name: "Trust Adekoye", phone: "09038476802", subunit: "Video" },
  { id: 2, name: "Trust Adekoye", phone: "09038476802", subunit: "Audio" },
  { id: 3, name: "Trust Adekoye", phone: "09038476802", subunit: "Admin" },
  { id: 4, name: "Trust Adekoye", phone: "09038476802", subunit: "Sound" },
  { id: 5, name: "Trust Adekoye", phone: "09038476802", subunit: "Video" },
  { id: 6, name: "Trust Adekoye", phone: "09038476802", subunit: "Audio" },
];

const Members: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);
  const [selected, setSelected] = useState<number[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setFilter(value);
    if (value) {
      setFilteredRows(
        rows.filter((row) => row.subunit.toLowerCase() === value.toLowerCase())
      );
    } else {
      setFilteredRows(rows);
    }
    setPage(0);
  };

  const handleUploadClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".csv, .xls, .xlsx";
    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log("Selected file:", file);
        // Handle the file upload logic here
      }
    };
    fileInput.click();
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredRows.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <div className="container">
      <Header pageTitle="Members" />
      <Box sx={{ padding: 3 }}>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: 2 }}
        >
          <Grid item>
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel>Filter by</InputLabel>
              <Select
                value={filter}
                onChange={handleFilterChange}
                displayEmpty
                label="Filter by"
                sx={{ height: 56 }}
              >
                <MenuItem value="">
                  <em>Filter by</em>
                </MenuItem>
                <MenuItem value="Video">Video</MenuItem>
                <MenuItem value="Audio">Audio</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Sound">Sound</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<UploadFileIcon sx={{ color: "#132034" }} />}
              sx={{
                marginRight: 2,
                backgroundColor: "#fff",
                borderColor: "#525252",
                color: "#132034",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  borderColor: "#525252",
                },
                height: 56,
                minWidth: 180,
              }}
              onClick={handleUploadClick}
            >
              Upload CSV
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: "#132034",
                color: "#fff",
                "&:hover": { backgroundColor: "#0f1724" },
                height: 56,
                minWidth: 180,
              }}
            >
              Add User
            </Button>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 &&
                      selected.length < filteredRows.length
                    }
                    checked={
                      filteredRows.length > 0 &&
                      selected.length === filteredRows.length
                    }
                    onChange={handleSelectAllClick}
                    sx={{
                      color: "#132034",
                      "&.Mui-checked": {
                        color: "#132034",
                      },
                    }}
                  />
                </TableCell>
                <TableCell>S/N</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Sub-unit</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected.indexOf(row.id) !== -1}
                        onChange={(event) => handleCheckboxClick(event, row.id)}
                        sx={{
                          color: "#132034",
                          "&.Mui-checked": {
                            color: "#132034",
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.subunit}</TableCell>
                    <TableCell>
                      <IconButton>
                        <AddCircleIcon color="success" />
                      </IconButton>
                      <IconButton>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton>
                        <CancelIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </div>
  );
};

export default Members;
