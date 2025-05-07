import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Header from "../Header";
import useMemberForm from "../../hooks/useMemberForm";
import TextFieldComponent from "./TextFieldComponent";
import PhoneInputComponent from "./PhoneInputComponent";

const maritalStatusOptions = ["SINGLE", "MARRIED"];
const genderOptions = ["MALE", "FEMALE"];

const monthOptions = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const CreateMember: React.FC = () => {
  const {
    formData,
    error,
    states,
    lgas,
    handleChange,
    handlePhoneChange,
    handleSubmit,
  } = useMemberForm();

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Header pageTitle="Add Member" />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Personal Details */}
          {[
            { label: "First Name", name: "firstName", required: true },
            { label: "Middle Name", name: "middleName" },
            { label: "Last Name", name: "lastName", required: true },
            { label: "Home Cell", name: "homeCell" },
            { label: "Occupation", name: "occupation", required: true },
            { label: "Address", name: "address", required: true },
            { label: "Reference", name: "reference" },
            { label: "Qualification", name: "qualification", required: true },
            { label: "Other Unit", name: "otherUnit" },
            { label: "Hobbies", name: "hobbies", required: true },
            { label: "Village", name: "village", required: true },
            { label: "Home Town", name: "homeTown", required: true },
          ].map((field) => (
            <TextFieldComponent
              key={field.name}
              label={field.label}
              name={field.name}
              value={formData[field.name as keyof typeof formData] || ""}
              onChange={handleChange}
              required={field.required}
            />
          ))}

          {/* Select Fields */}
          {[
            {
              label: "Marital Status",
              name: "maritalStatus",
              options: maritalStatusOptions,
            },
            { label: "Gender", name: "gender", options: genderOptions },
          ].map((field) => (
            <TextFieldComponent
              key={field.name}
              label={field.label}
              name={field.name}
              value={formData[field.name as keyof typeof formData] || ""}
              onChange={handleChange}
              required
              options={field.options}
            />
          ))}

          {/* Date Fields */}
          {[
            { label: "Joined Unit At", name: "joinedUnitAt" },
            { label: "Joined Commission At", name: "joinedCommissionAt" },
            { label: "New Birth At", name: "newBirthAt" },
            { label: "Baptized At", name: "baptizedAt" },
          ].map((field) => (
            <TextFieldComponent
              key={field.name}
              label={field.label}
              name={field.name}
              value={formData[field.name as keyof typeof formData] || ""}
              onChange={handleChange}
              type="date"
            />
          ))}

          {/* Birth Day */}
          <TextFieldComponent
            label="Birth Day"
            name="birthDay"
            value={formData.birthDay || 0}
            onChange={handleChange}
            required
            type="number"
            InputProps={{ inputProps: { min: 1, max: 31 } }}
          />

          {/* Birth Month */}
          <TextFieldComponent
            label="Birth Month"
            name="birthMonth"
            value={formData.birthMonth || 1}
            onChange={handleChange}
            required
            options={monthOptions}
          />

          {/* State */}
          <TextFieldComponent
            label="State"
            name="state"
            value={formData.state || ""}
            onChange={handleChange}
            required
            options={states.map((state) => state.state)}
          />

          {/* LGA */}
          <TextFieldComponent
            label="LGA"
            name="lga"
            value={formData.lga || ""}
            onChange={handleChange}
            required
            options={lgas}
          />

          {/* Phone Inputs */}
          <PhoneInputComponent
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={(value) => handlePhoneChange("phoneNumber", value)}
          />
          <PhoneInputComponent
            label="Next of Kin Phone Number"
            value={formData.nextOfKinNumber}
            onChange={(value) => handlePhoneChange("nextOfKinNumber", value)}
          />

          {/* Next of Kin Name */}
          <TextFieldComponent
            label="Next of Kin"
            name="nextOfKinName"
            value={formData.nextOfKinName || ""}
            onChange={handleChange}
            required
          />

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: 2,
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              Submit
            </Button>
            {error && (
              <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
                {error}
              </Typography>
            )}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateMember;
