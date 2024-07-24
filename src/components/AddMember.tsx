import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
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
  joinedCommissionAt: string;
  newBirthAt: string;
  baptizedAt: string;
  occupation: string;
  birthday: string;
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
    joinedCommissionAt: "",
    newBirthAt: "",
    baptizedAt: "",
    occupation: "",
    birthday: "",
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form values:", formValues);
  };

  return (
    <div className="container">
      <Header pageTitle="Add New Member" />
      <Box sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* First Row */}
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

            {/* Second Row */}
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

            {/* Third Row */}
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
              <FormControl required fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Joined Unit at"
                    value={formValues.joinedUnitAt}
                    onChange={handleDateChange("joinedUnitAt")}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>

            {/* Additional Rows */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Joined Commission at?"
                name="joinedCommissionAt"
                value={formValues.joinedCommissionAt}
                onChange={handleTextFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="New Birth at?"
                name="newBirthAt"
                value={formValues.newBirthAt}
                onChange={handleTextFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Baptized at?"
                name="baptizedAt"
                value={formValues.baptizedAt}
                onChange={handleTextFieldChange}
              />
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
              <TextField
                fullWidth
                label="Birthday"
                name="birthday"
                value={formValues.birthday}
                onChange={handleTextFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Birth Month"
                name="birthMonth"
                value={formValues.birthMonth}
                onChange={handleTextFieldChange}
              />
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
                label="Other units?"
                name="otherUnits"
                value={formValues.otherUnits}
                onChange={handleTextFieldChange}
              />
            </Grid>
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
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default AddMember;
