import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import Header from "./Header";

const maritalStatusOptions = ["SINGLE", "MARRIED"];
const genderOptions = ["MALE", "FEMALE"];

const AddMember: React.FC = () => {
  const [formData, setFormData] = useState({
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
    birthDay: "",
    birthMonth: "",
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "birthDay" || name === "birthMonth" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send form values to the main process using IPC
    window.ipcRenderer
      .invoke("create:member", formData) // Using formData instead of formValues
      .then((response) => {
        console.log("Member created:", response);

        console.log("Form data:", formData);
        // Optionally reset the form after success
        // setFormData({
        //   firstName: "",
        //   middleName: "",
        //   lastName: "",
        //   maritalStatus: "",
        //   gender: "",
        //   homeCell: "",
        //   joinedUnitAt: "",
        //   joinedCommissionAt: "",
        //   newBirthAt: "",
        //   baptizedAt: "",
        //   occupation: "",
        //   birthDay: "",
        //   birthMonth: "",
        //   phoneNumber: "",
        //   address: "",
        //   reference: "",
        //   qualification: "",
        //   otherUnit: "",
        //   hobbies: "",
        //   nextOfKin: "",
        //   nextOfKinNumber: "",
        //   village: "",
        //   homeTown: "",
        //   lga: "",
        //   state: "",
        // });
        // Optionally handle a success message or redirect
      })
      .catch((error) => {
        console.error("Error creating member:", error);
        // Handle error case, e.g., show an error message
      });
  };

  return (
    <Box>
      <Header pageTitle="Add Member" />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* First Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>

          {/* Middle Name (Optional) */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </Grid>

          {/* Last Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>

          {/* Marital Status */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              select
              label="Marital Status"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
            >
              {maritalStatusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Gender */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              {genderOptions.map((gender) => (
                <MenuItem key={gender} value={gender}>
                  {gender}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Home Cell (Optional) */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Home Cell"
              name="homeCell"
              value={formData.homeCell}
              onChange={handleChange}
            />
          </Grid>

          {/* Joined Unit At */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              type="date"
              label="Joined Unit At"
              name="joinedUnitAt"
              value={formData.joinedUnitAt}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Joined Commission At */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              type="date"
              label="Joined Commission At"
              name="joinedCommissionAt"
              value={formData.joinedCommissionAt}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* New Birth At (Optional) */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="New Birth At"
              name="newBirthAt"
              value={formData.newBirthAt}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Baptized At (Optional) */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Baptized At"
              name="baptizedAt"
              value={formData.baptizedAt}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Occupation */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />
          </Grid>

          {/* Birth Day */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              required
              type="number"
              label="Birth Day"
              name="birthDay"
              value={formData.birthDay}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 1, max: 31 } }}
            />
          </Grid>

          {/* Birth Month */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              required
              type="number"
              label="Birth Month"
              name="birthMonth"
              value={formData.birthMonth}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 1, max: 12 } }}
            />
          </Grid>

          {/* Phone Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Grid>

          {/* Address */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>

          {/* Reference (Optional) */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Reference"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
            />
          </Grid>

          {/* Qualification */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
            />
          </Grid>

          {/* Other Unit (Optional) */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Other Unit"
              name="otherUnit"
              value={formData.otherUnit}
              onChange={handleChange}
            />
          </Grid>

          {/* Hobbies */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Hobbies"
              name="hobbies"
              value={formData.hobbies}
              onChange={handleChange}
            />
          </Grid>

          {/* Next of Kin */}
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

          {/* Next of Kin Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Next of Kin Phone Number"
              name="nextOfKinNumber"
              value={formData.nextOfKinNumber}
              onChange={handleChange}
            />
          </Grid>

          {/* Village */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Village"
              name="village"
              value={formData.village}
              onChange={handleChange}
            />
          </Grid>

          {/* Home Town */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Home Town"
              name="homeTown"
              value={formData.homeTown}
              onChange={handleChange}
            />
          </Grid>

          {/* LGA */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="LGA"
              name="lga"
              value={formData.lga}
              onChange={handleChange}
            />
          </Grid>

          {/* State */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddMember;
