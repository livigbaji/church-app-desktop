import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { getAllMembers, MemberData } from "@/services/memberService";

interface SearchFieldProps {
  onSearch: (value: MemberData | null) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ onSearch }) => {
  const [members, setMembers] = useState<MemberData[]>([]);
  const [value, setValue] = useState<MemberData | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getAllMembers();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: MemberData | null
  ) => {
    setValue(newValue);
    onSearch(newValue);
  };

  return (
    <Autocomplete
      options={members}
      getOptionLabel={(option) =>
        `${option.firstName} ${option.middleName || ""} ${option.lastName}`
      }
      value={value}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} label="Search for a member" variant="outlined" />
      )}
    />
  );
};

export default SearchField;
