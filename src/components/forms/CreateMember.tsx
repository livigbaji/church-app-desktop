import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Grid, MenuItem } from "@mui/material";
import Header from "../Header";
import { createMember, MemberData } from "@/services/memberService";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

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
  birthMonth: 1, // Initialize with a valid value
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
  id: "",
};

const CreateMember: React.FC = () => {
  const [formData, setFormData] = useState<MemberData>(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const [states, setStates] = useState<any[]>([]);
  const [lgas, setLgas] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./nigerianStates.json"); // Correct relative path
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error("Failed to fetch states data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (formData.state) {
      const selectedState = states.find(
        (state) => state.state === formData.state
      );
      if (selectedState) {
        setLgas(selectedState.lgas);
      }
    }
  }, [formData.state, states]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: ["birthDay", "birthMonth"].includes(name) ? Number(value) : value,
    }));
  };

  const handlePhoneChange = (
    name: keyof MemberData,
    value: string | undefined
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

          {/* Birth Day */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              type="number"
              label="Birth Day"
              name="birthDay"
              required
              value={formData.birthDay}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 1, max: 31 } }}
            />
          </Grid>

          {/* Birth Month */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              select
              label="Birth Month"
              name="birthMonth"
              required
              value={formData.birthMonth}
              onChange={handleChange}
            >
              {monthOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* State */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="State"
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
            >
              {states.map((state) => (
                <MenuItem key={state.state} value={state.state}>
                  {state.state}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* LGA */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="LGA"
              name="lga"
              required
              value={formData.lga}
              onChange={handleChange}
            >
              {lgas.map((lga) => (
                <MenuItem key={lga} value={lga}>
                  {lga}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

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
