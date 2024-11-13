import React, { useEffect, useState } from "react";
import { getAllMembers, MemberData } from "@/services/memberService";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface MemberDropDownProps {
  onChange: (value: string) => void;
}

const MemberDropDown: React.FC<MemberDropDownProps> = ({ onChange }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [members, setMembers] = useState<MemberData[]>([]);

  // Fetch members data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const members: MemberData[] = await getAllMembers();
        setMembers(members);
        console.log("Here are the members: ", members);
      } catch (error) {
        console.error("Failed to fetch members:", error);
      }
    };

    fetchData();
  }, []);

  // Map members to options format
  const membersList = members.map((member) => ({
    id: member.id,
    name: member.firstName,
  }));

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div>
      <Select variant="outlined" value={selectedValue} onChange={handleChange}>
        <MenuItem value="">Select a member</MenuItem>
        {membersList.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default MemberDropDown;
