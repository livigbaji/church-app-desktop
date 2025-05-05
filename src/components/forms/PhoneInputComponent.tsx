// PhoneInputComponent.tsx
import React from "react";
import { Typography, Grid } from "@mui/material";
import PhoneInput from "react-phone-number-input";

type PhoneInputProps = {
  label: string;
  value: string;
  onChange: (value: string | undefined) => void;
};

const PhoneInputComponent: React.FC<PhoneInputProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <Grid item xs={12} sm={6}>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        {label}
      </Typography>
      <PhoneInput
        international
        defaultCountry="NG"
        placeholder={`Enter ${label.toLowerCase()}`}
        value={value}
        onChange={onChange}
        style={{ marginBottom: "16px" }}
      />
    </Grid>
  );
};

export default PhoneInputComponent;
