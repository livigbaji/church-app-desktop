import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import {
  Box,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import Header from "./Header";

interface FormValues {
  firstName: string;
  middleName: string;
  lastName: string;
  maritalStatus: string;
  gender: string;
  homecell: string;
  joinedUnitAt: Dayjs | null;
  joinedCommissionAt: Dayjs | null;
  newBirthAt: Dayjs | null;
  baptizedAt: Dayjs | null;
  occupation: string;
  birthday: Dayjs | null;
  birthMonth: string;
  phoneNumber: string;
  address: string;
  reference: string;
  qualification: string;
  otherUnits: string;
  hobbies: string;
  nextOfKin: string;
  nextOfKinNumber: string;
  village: string;
  hometown: string;
  lga: string;
  state: string;
}

const AddMember: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    middleName: "",
    lastName: "",
    maritalStatus: "",
    gender: "",
    homecell: "",
    joinedUnitAt: null,
    joinedCommissionAt: null,
    newBirthAt: null,
    baptizedAt: null,
    occupation: "",
    birthday: null,
    birthMonth: "",
    phoneNumber: "",
    address: "",
    reference: "",
    qualification: "",
    otherUnits: "",
    hobbies: "",
    nextOfKin: "",
    nextOfKinNumber: "",
    village: "",
    hometown: "",
    lga: "",
    state: "",
  });

  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Bio Data", "Contact", "Hobbies", "Reference and Other Info"];

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDateChange = (name: keyof FormValues) => (date: Dayjs | null) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: date,
    }));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form values:", formValues);
  };

  return (
    <div className="container">
      <Header pageTitle="Add New Member" />
      <Box sx={{ padding: 3 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit}>
          {activeStep === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleTextFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  label="Middle Name"
                  name="middleName"
                  value={formValues.middleName}
                  onChange={handleTextFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleTextFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl required fullWidth>
                  <InputLabel>Marital Status</InputLabel>
                  <Select
                    name="maritalStatus"
                    value={formValues.maritalStatus}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="Married">Married</MenuItem>
                    <MenuItem value="Divorced">Divorced</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl required fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formValues.gender}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Homecell"
                  name="homecell"
                  value={formValues.homecell}
                  onChange={handleTextFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Joined Unit at"
                    value={formValues.joinedUnitAt}
                    onChange={handleDateChange("joinedUnitAt")}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          )}

          {activeStep === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Joined Commission at"
                    value={formValues.joinedCommissionAt}
                    onChange={handleDateChange("joinedCommissionAt")}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="New Birth at"
                    value={formValues.newBirthAt}
                    onChange={handleDateChange("newBirthAt")}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Baptized at"
                    value={formValues.baptizedAt}
                    onChange={handleDateChange("baptizedAt")}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Occupation"
                  name="occupation"
                  value={formValues.occupation}
                  onChange={handleTextFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl required fullWidth>
                  <InputLabel>Birth Month</InputLabel>
                  <Select
                    name="birthMonth"
                    value={formValues.birthMonth}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="January">January</MenuItem>
                    <MenuItem value="February">February</MenuItem>
                    <MenuItem value="March">March</MenuItem>
                    <MenuItem value="April">April</MenuItem>
                    <MenuItem value="May">May</MenuItem>
                    <MenuItem value="June">June</MenuItem>
                    <MenuItem value="July">July</MenuItem>
                    <MenuItem value="August">August</MenuItem>
                    <MenuItem value="September">September</MenuItem>
                    <MenuItem value="October">October</MenuItem>
                    <MenuItem value="November">November</MenuItem>
                    <MenuItem value="December">December</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Birthday"
                    views={["year", "month", "day"]}
                    value={formValues.birthday}
                    onChange={handleDateChange("birthday")}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formValues.phoneNumber}
                  onChange={handleTextFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formValues.address}
                  onChange={handleTextFieldChange}
                />
              </Grid>
            </Grid>
          )}

          {activeStep === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Hobbies"
                  name="hobbies"
                  value={formValues.hobbies}
                  onChange={handleTextFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Other units?"
                  name="otherUnits"
                  value={formValues.otherUnits}
                  onChange={handleTextFieldChange}
                />
              </Grid>
            </Grid>
          )}

          {activeStep === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Reference"
                  name="reference"
                  value={formValues.reference}
                  onChange={handleTextFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Qualification"
                  name="qualification"
                  value={formValues.qualification}
                  onChange={handleTextFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Next of Kin"
                  name="nextOfKin"
                  value={formValues.nextOfKin}
                  onChange={handleTextFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Next of Kin Number"
                  name="nextOfKinNumber"
                  value={formValues.nextOfKinNumber}
                  onChange={handleTextFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Village"
                  name="village"
                  value={formValues.village}
                  onChange={handleTextFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Hometown"
                  name="hometown"
                  value={formValues.hometown}
                  onChange={handleTextFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="LGA"
                  name="lga"
                  value={formValues.lga}
                  onChange={handleTextFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formValues.state}
                  onChange={handleTextFieldChange}
                />
              </Grid>
            </Grid>
          )}

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {activeStep === steps.length - 1 ? (
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            ) : (
              <Button onClick={handleNext} variant="contained" color="primary">
                Next
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default AddMember;
