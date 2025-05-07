export interface MemberData {
  id: string;
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

export const createMember = async (
  memberData: MemberData
): Promise<MemberData> => {
  try {
    const response = await window.backend.invoke("create:member", memberData);
    console.log("Member created:", response);
    return response; // Now, this function promises to return a MemberData object
  } catch (error) {
    console.error("Error creating member:", error);
    throw error;
  }
};

export const getAllMembers = async (): Promise<MemberData[]> => {
  const { data: members } = await window.backend.invoke("get:members");

  return members;
};

export const deleteMember = async (memberId: string): Promise<void> => {
  try {
    await window.backend.invoke("delete:member", memberId);
    console.log("Member deleted:", memberId);
  } catch (error) {
    console.error("Error deleting member:", error);
    throw error;
  }
};

export const suspendMember = async (
  memberId: string,
  note: string
): Promise<void> => {
  try {
    await window.backend.invoke("suspend:member", memberId, note);
    console.log("Member suspended:", memberId);
  } catch (error) {
    console.error("Error suspending member:", error);
    throw error;
  }
};

export const unsuspendMember = async (memberId: string): Promise<void> => {
  try {
    await window.backend.invoke("unsuspend:member", memberId);
    console.log("Member unsuspended:", memberId);
  } catch (error) {
    console.error("Error unsuspending member:", error);
    throw error;
  }
};
