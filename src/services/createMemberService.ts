export interface MemberData {
  firstName: string;
  middleName?: string;
  lastName: string;
  maritalStatus: string;
  gender: string;
  homeCell?: string;
  joinedUnitAt: string;
  joinedCommissionAt: string;
  newBirthAt?: string;
  baptizedAt?: string;
  occupation: string;
  birthDay: number;
  birthMonth: number;
  phoneNumber: string;
  address: string;
  reference?: string;
  qualification: string;
  otherUnit?: string;
  hobbies: string;
  nextOfKinName: string;
  nextOfKinNumber: string;
  village: string;
  homeTown: string;
  lga: string;
  state: string;
}

export const createMember = async (memberData: MemberData): Promise<any> => {
  try {
    const response = await window.ipcRenderer.invoke(
      "create:member",
      memberData,
    );
    console.log("Member created:", response);
    return response; // You could return data for further processing if needed
  } catch (error) {
    console.error("Error creating member:", error);
    throw error;
  }
};
