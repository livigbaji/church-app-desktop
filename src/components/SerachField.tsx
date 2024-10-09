import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchFieldProps {
  placeholder?: string;
  onSearch: (value: string) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({
  placeholder = "Search...",
  onSearch,
}) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <Box sx={{ mb: 2, mt: 2 }}>
      <TextField
        variant="outlined"
        fullWidth
        placeholder={placeholder}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            // width: "655px",
            height: "40px",
          },
        }}
      />
    </Box>
  );
};

export default SearchField;
