import { SignInRequest } from "@/types";

/**
 * Sends a request to sign in a member.
 * Uses the 'signIn' channel to send data via backend.
 * @param {SignInRequest} signInData - Data required to sign in a member.
 * @returns {Promise<void>} - A promise that resolves when the sign-in is successful.
 */
export const signIn = async (signInData: SignInRequest): Promise<void> => {
  try {
    const response = await window.backend.invoke("signIn", signInData);
    console.log("Member signed in:", response);
    return response;
  } catch (error) {
    console.error("Error signing in member:", error);
    throw error;
  }
};
