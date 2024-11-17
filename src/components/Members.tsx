import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import SuspendIcon from "@mui/icons-material/PauseCircle";
import Header from "./Header";
import CustomSpeedDial from "./CustomSpeedDial";
import {
  getAllMembers,
  deleteMember,
  suspendMember,
  MemberData,
} from "../services/memberService";
import CsvUpload from "@/components/CsvUpload";

const Members: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState("");
  const [members, setMembers] = useState<MemberData[]>([]);
  const [filteredRows, setFilteredRows] = useState<MemberData[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [openSuspendDialog, setOpenSuspendDialog] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [suspensionNote, setSuspensionNote] = useState("");

  const handleFileSelected = (file: File) => {
    console.log("File uploaded:", file);
    // Handle the file upload logic here
    // You can implement your CSV parsing logic or further processing here
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const members = await getAllMembers();
        setMembers(members);
        setFilteredRows(members);
      } catch (error) {
        console.error("Failed to fetch members:", error);
      }
    };

    fetchData();
  }, []);

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
        members.filter(
          (row) => row.otherUnit?.toLowerCase() === value.toLowerCase()
        )
      );
    } else {
      setFilteredRows(members);
    }
    setPage(0);
  };

  const handleDeleteMember = async (memberId: string) => {
    try {
      await deleteMember(memberId);
      setMembers(members.filter((member) => member.id !== memberId));
      setFilteredRows(filteredRows.filter((member) => member.id !== memberId));
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const handleSuspendMember = (memberId: string) => {
    setSelectedMemberId(memberId);
    setOpenSuspendDialog(true);
  };

  const handleSuspendConfirm = async () => {
    try {
      await suspendMember(selectedMemberId, suspensionNote);
      setMembers(
        members.map((member) =>
          member.id === selectedMemberId
            ? { ...member, status: "SUSPENDED" }
            : member
        )
      );
      setFilteredRows(
        filteredRows.map((member) =>
          member.id === selectedMemberId
            ? { ...member, status: "SUSPENDED" }
            : member
        )
      );
      setOpenSuspendDialog(false);
      setSelectedMemberId("");
      setSuspensionNote("");
    } catch (error) {
      console.error("Error suspending member:", error);
    }
  };

  const handleSuspendCancel = () => {
    setOpenSuspendDialog(false);
    setSelectedMemberId("");
    setSuspensionNote("");
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
            <CsvUpload onFileSelected={handleFileSelected} />{" "}
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
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={selected.indexOf(index) !== -1} />
                    </TableCell>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      {`${row.firstName} ${row.middleName || ""} ${
                        row.lastName
                      }`}
                    </TableCell>
                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell>{row.otherUnit || "N/A"}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteMember(row.id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                      <IconButton onClick={() => handleSuspendMember(row.id)}>
                        <SuspendIcon color="warning" />
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

      <CustomSpeedDial actions={[]} />

      <Dialog open={openSuspendDialog} onClose={handleSuspendCancel}>
        <DialogTitle>Suspend Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a reason for suspending this member.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Suspension Note"
            type="text"
            fullWidth
            value={suspensionNote}
            onChange={(e) => setSuspensionNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuspendCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSuspendConfirm} color="primary">
            Suspend
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Members;
