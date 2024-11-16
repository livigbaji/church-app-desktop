import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getUnits } from "@/services/unitService";
import { UnitData } from "@/types";
import CustomSpeedDial from "./CustomSpeedDial";
import Header from "./Header";
import CsvUpload from "./CsvUpload";

const AddUnitIcon = (
  <Icon
    sx={{
      height: "30px",
      width: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <img src="/public/assets/icons/add-unit-icon.svg" alt="Add Unit" />
  </Icon>
);

const SubUnit: React.FC = () => {
  const [units, setUnits] = useState<UnitData[]>([]);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const data = await getUnits();
        setUnits(data);
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };

    fetchUnits();
  }, []);

  return (
    <div className="container">
      <Header pageTitle="Sub-Units" />

      <Box
        sx={{
          mt: 2,
          bgcolor: "#fff",
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <CsvUpload
          onFileSelected={function (file: File): void {
            throw new Error("Function not implemented.");
          }}
        />

        <Button
          startIcon={AddUnitIcon}
          variant="contained"
          disableElevation
          sx={{
            mb: 2,
            height: 56,
            minWidth: 180,
            whiteSpace: "nowrap",
            borderRadius: "5px",
            bgcolor: "#132034",
            textTransform: "none",
            fontSize: "14px",
            fontWeight: 400,
          }}
        >
          Add Sub-units
        </Button>
      </Box>

      {/* Add table here */}
      <Box sx={{ mt: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="units table">
            <TableHead>
              <TableRow>
                <TableCell>S/N</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {units.map((unit, index) => (
                <TableRow key={unit.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{unit.name}</TableCell>
                  <TableCell>{unit.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <CustomSpeedDial actions={[]} />
    </div>
  );
};

export default SubUnit;
