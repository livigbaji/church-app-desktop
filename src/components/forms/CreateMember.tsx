import React, {useState} from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Header from "../Header";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
          {...other}
      >
        {value === index && (
            <Box sx={{ p: 3 }}>
              <Typography>{children}</Typography>
            </Box>
        )}
      </div>
  );
}



const CreateMember: React.FC = () => {
  const {
    formData,
    states,
    lgas,
    handleChange,
    handlePhoneChange,
    handleSubmit,
  } = useMemberForm();

  const [tabIndex, setTabIndex] = useState(1);

  const handleTabChange= (_e: any, value: number) => {
      setTabIndex(value);
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Header pageTitle="Add Member" />
        <form onSubmit={handleSubmit}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 3 }}>
            <Tabs centered value={tabIndex} onChange={handleTabChange} aria-label="basic tabs" >
              <Tab label="Basic information" value={1}/>
              <Tab label="Personal details" value={2}/>
              <Tab label="Address and Origin" value={3}/>
              <Tab label="Occupation and Baptism" value={4}/>
            </Tabs>
          </Box>

          <TabPanel value={tabIndex} index={1} >
            <Grid container spacing={3}>
              {[
                { label: "First Name", name: "firstName", required: true },
                { label: "Middle Name", name: "middleName" },
                { label: "Last Name", name: "lastName", required: true },
              ].map((field) => (
                  <Grid item xs={12} sm={4} lg={4} key={field.name}>
                    <TextFieldComponent
                        label={field.label}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData] || ""}
                        onChange={handleChange}
                        required={field.required}
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
                  <Grid item xs={12} sm={6} lg={6} key={field.name}>
                    <TextFieldComponent
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData] || ""}
                        onChange={handleChange}
                        required
                        options={field.options}
                    />
                  </Grid>
              ))}

              {/* Phone Inputs */}
              <PhoneInputComponent
                  label="Phone Number"
                  value={formData.phoneNumber}
                  onChange={(value) => handlePhoneChange("phoneNumber", value)}
              />
            </Grid>
          </TabPanel>
          <TabPanel value={tabIndex} index={2} >
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

            <TextFieldComponent
                label="Hobbies"
                name="hobbies"
                value={formData.hobbies || ''}
                onChange={handleChange}
                required
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

          </TabPanel>
          <TabPanel value={tabIndex} index={3}>
            <Grid container spacing={3}>
              {/* Personal Details */}
              {[
                { label: "Village", name: "village", required: true },
                { label: "Address", name: "address", required: true },
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

            </Grid>


          </TabPanel>
          <TabPanel value={tabIndex} index={4}>

            {/* Personal Details */}
            {[
              { label: "Home Cell", name: "homeCell" },
              { label: "Occupation", name: "occupation", required: true },
              { label: "Reference", name: "reference" },
              { label: "Qualification", name: "qualification", required: true },
              { label: "Other Unit", name: "otherUnit" },
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
          </TabPanel>









          <Grid container>
            {/* Submit Button */}
            <Grid item xs={6} lg={6} md={6}>
              <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    marginTop: 2,
                    color: '#0a3768',
                    backgroundColor: "#f1f5f1",
                    "&:hover": { backgroundColor: "#c8def6" },
                  }}
              >
                Back
              </Button>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={6} lg={6} md={6}>
              <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    marginTop: 2,
                    backgroundColor: "#0a3768",
                    "&:hover": { backgroundColor: "#1565c0" },
                  }}
              >
                Next
              </Button>
            </Grid>
          </Grid>

      </form>
    </Box>
  );
};

export default CreateMember;
