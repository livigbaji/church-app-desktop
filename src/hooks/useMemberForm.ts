import { useState, useEffect } from "react";
import { MemberData, createMember } from "@/services/memberService";

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
  birthMonth: 1,
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

type NigerianState = {
  state: string;
  lgas: string[];
};

const useMemberForm = () => {
  const [formData, setFormData] = useState<MemberData>(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const [states, setStates] = useState<NigerianState[]>([]);
  const [lgas, setLgas] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./nigerianStates.json");
        const data: NigerianState[] = await response.json();
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

  return {
    formData,
    error,
    states,
    lgas,
    handleChange,
    handlePhoneChange,
    handleSubmit,
  };
};

export default useMemberForm;
