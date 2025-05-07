import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Header from "./Header";
import CustomSpeedDial from "./CustomSpeedDial";
import SearchField from "@/components/SearchField";
import { MemberData } from "@/services/memberService";
import { signIn } from "@/services/attendanceService";
import { AttendanceStatus } from "../../electron/backend/types";
import { SignInRequest } from "@/types";

const Attendance: React.FC = () => {
  const [selectedMembers, setSelectedMembers] = useState<MemberData[]>([]);

  const handleSearch = (value: MemberData | null) => {
    if (value) {
      setSelectedMembers((prevMembers) => [...prevMembers, value]);
      console.log("Search for:", value.firstName, value.lastName);
    } else {
      console.log("No member selected");
    }
  };

  const handleSignIn = async (member: MemberData) => {
    const signInData: SignInRequest = {
      user: member.id,
      isExternal: false,
      // position: member.position || undefined,
      timeIn: new Date(), // Use the current date and time
      status: AttendanceStatus.PRESENT, // Adjust the status as needed
    };

    try {
      await signIn(signInData);
      console.log("Member signed in:", member.firstName, member.lastName);
    } catch (error) {
      console.error("Error signing in member:", error);
    }
  };

  return (
    <Box>
      <Header pageTitle="Attendance" />
      <SearchField onSearch={handleSearch} />

      {/* Table to display selected members */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="selected members table">
          <TableHead sx={{ bgcolor: "#F4F4F4" }}>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell>Full Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedMembers.map((member, index) => (
              <TableRow
                key={index}
                onClick={() => handleSignIn(member)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{`${member.firstName} ${member.lastName}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CustomSpeedDial actions={[]} />
    </Box>
  );
};

export default Attendance;
