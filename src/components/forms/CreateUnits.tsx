import { Box, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import {
  createUnit,
  CreateUnitServiceData,
  CreateUnitResponse,
} from "@/services/unitService";
import MemberDropDown from "@/components/MemberDropDown";

const CreateUnits: React.FC = () => {
  // State to hold form values
  const [formData, setFormData] = useState<CreateUnitServiceData>({
    leader: "",
    name: "",
    description: "",
  });

  // Handle changes to form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof e === "string") {
      setFormData((prevData) => ({
        ...prevData,
        leader: e,
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response: CreateUnitResponse = await createUnit(formData);

      if (response.success) {
        console.log("Unit successfully created:", response.unitId);
        // Reset form fields
        setFormData({ leader: "", name: "", description: "" });
      } else {
        console.error("Creation failed:", response.error);
      }
    } catch (error) {
      console.error("Error during unit creation:", error);
      // Handle unexpected errors (e.g., network issues)
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 500, m: "auto", p: 3 }}
    >
      <h1>Create New Unit</h1>
      {/* Leader (Optional) */}
      <MemberDropDown onChange={handleChange} />

      {/* Name (Required) */}
      <TextField
        fullWidth
        required
        label="Unit Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
      />

      {/* Description (Required) */}
      <TextField
        fullWidth
        required
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        margin="normal"
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CreateUnits;
