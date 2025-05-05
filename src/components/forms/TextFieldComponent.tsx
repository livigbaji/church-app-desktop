import React from "react";
import { TextField, MenuItem, Grid, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#000",
      borderWidth: "1.5px",
      borderRadius: "8px",
    },
    "&:hover fieldset": {
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
    },
  },
});

type Option = { value: number; label: string } | string;

type TextFieldComponentProps = {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  options?: Option[];
  InputProps?: TextFieldProps["InputProps"];
};

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
  options,
  InputProps,
}) => {
  return (
    <Grid item xs={12} sm={6}>
      <StyledTextField
        fullWidth
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        variant="outlined"
        sx={{ marginBottom: 2 }}
        InputLabelProps={{ shrink: true }}
        type={type}
        select={!!options}
        InputProps={InputProps}
      >
        {options &&
          options.map((option) => (
            <MenuItem
              key={typeof option === "string" ? option : option.value}
              value={typeof option === "string" ? option : option.value}
            >
              {typeof option === "string" ? option : option.label}
            </MenuItem>
          ))}
      </StyledTextField>
    </Grid>
  );
};

export default TextFieldComponent;
