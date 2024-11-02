import React, { useState } from "react";
import { Box, TextField, Button, Grid, MenuItem } from "@mui/material";
import Header from "../Header";
import { createMember, MemberData } from "@/services/createMemberService";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const maritalStatusOptions = ["SINGLE", "MARRIED"];
const genderOptions = ["MALE", "FEMALE"];

const initialFormState: MemberData = {
  firstName: "",
  middleName: "",
  lastName: "",
  maritalStatus: "",
  gender: "",
  homeCell: "",
  joinedUnitAt: "",
  joinedCommissionAt: "",
  newBirthAt: "",
  baptizedAt: "",
  occupation: "",
  birthDay: 0,
  birthMonth: 0,
  phoneNumber: "",
  address: "",
  reference: "",
  qualification: "",
  otherUnit: "",
  hobbies: "",
  nextOfKinName: "",
  nextOfKinNumber: "",
  village: "",
  homeTown: "",
  lga: "",
  state: "",
};

const CreateMember: React.FC = () => {
  const [formData, setFormData] = useState<MemberData>(initialFormState);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: ["birthDay", "birthMonth"].includes(name) ? Number(value) : value,
    }));
  };

  const handlePhoneChange = (
    name: keyof MemberData,
    value: string | undefined,
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await createMember(formData);
      console.log("Form data:", formData);
      setFormData(initialFormState);
    } catch (error) {
      setError("Failed to create member. Please try again.");
    }
  };

  return (
    <Box>
      <Header pageTitle="Add Member" />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
            { label: "LGA", name: "lga", required: true },
            { label: "State", name: "state", required: true },
          ].map((field) => (
            <Grid item xs={12} sm={6} key={field.name}>
              <TextField
                fullWidth
                label={field.label}
                name={field.name}
                required={field.required}
                value={formData[field.name as keyof MemberData]}
                onChange={handleChange}
              />
            </Grid>
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
            <Grid item xs={12} sm={6} key={field.name}>
              <TextField
                fullWidth
                select
                label={field.label}
                name={field.name}
                required
                value={formData[field.name as keyof MemberData]}
                onChange={handleChange}
              >
                {field.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ))}

          {/* Date Fields */}
          {[
            { label: "Joined Unit At", name: "joinedUnitAt" },
            { label: "Joined Commission At", name: "joinedCommissionAt" },
            { label: "New Birth At", name: "newBirthAt" },
            { label: "Baptized At", name: "baptizedAt" },
          ].map((field) => (
            <Grid item xs={12} sm={6} key={field.name}>
              <TextField
                fullWidth
                type="date"
                label={field.label}
                name={field.name}
                value={formData[field.name as keyof MemberData]}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          ))}

          {/* Birth Day and Month */}
          {[
            { label: "Birth Day", name: "birthDay", min: 1, max: 31 },
            { label: "Birth Month", name: "birthMonth", min: 1, max: 12 },
          ].map((field) => (
            <Grid item xs={12} sm={3} key={field.name}>
              <TextField
                fullWidth
                type="number"
                label={field.label}
                name={field.name}
                required
                value={formData[field.name as keyof MemberData]}
                onChange={handleChange}
                InputProps={{ inputProps: { min: field.min, max: field.max } }}
              />
            </Grid>
          ))}

          {/* Phone Inputs */}
          <Grid item xs={12} sm={6}>
            <PhoneInput
              international
              defaultCountry="NG"
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={(value) => handlePhoneChange("phoneNumber", value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PhoneInput
              international
              defaultCountry="NG"
              placeholder="Enter next of kin phone number"
              value={formData.nextOfKinNumber}
              onChange={(value) => handlePhoneChange("nextOfKinNumber", value)}
            />
          </Grid>

          {/* Next of Kin Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Next of Kin"
              name="nextOfKinName"
              value={formData.nextOfKinName}
              onChange={handleChange}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateMember;
