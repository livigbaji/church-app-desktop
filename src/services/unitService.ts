// Interface for data required to create a unit
export interface CreateUnitServiceData {
  leader?: string; // Optional leader ID, should be a UUID if provided
  name: string; // Name of the unit
  description: string; // Description of the unit
}

// Interface for the response when creating a unit
export interface CreateUnitResponse {
  success: boolean; // Indicates if the unit creation was successful
  unitId?: string; // ID of the created unit if successful
  error?: string; // Error message if creation fails
}

/**
 * Sends a request to create a new unit in the backend.
 * Uses the 'create:unit' channel to send data via backend.
 * @param {CreateUnitServiceData} createUnitData - Data required to create a new unit.
 * @returns {Promise<CreateUnitResponse>} - A promise that resolves to the response from the backend.
 */
export const createUnit = async (
  createUnitData: CreateUnitServiceData,
): Promise<CreateUnitResponse> => {
  try {
    const response = await window.backend.invoke(
      "create:unit",
      createUnitData,
    );
    console.log("Unit created:", response);
    return response;
  } catch (error) {
    console.error("Error creating Unit:", error);
    throw error;
  }
};

/**
 * Fetches the total list of units from the backend, optionally filtered by a search term.
 * Uses the 'get:units' channel to request unit data.
 * @param {string} search - Optional search query to filter the units.
 * @returns {Promise<Array>} - A promise that resolves to an array of units.
 */
export const getTotalUnits = async (search: string) => {
  const { data: units } = await window.backend.invoke("get:units", {
    search,
  });
  return units;
};

/**
 * Fetches upcoming birthdays of members based on the specified month.
 * Uses the 'birthdays:member' channel to request birthday data.
 * @param {number} month - The month (1-12) for which to fetch upcoming birthdays.
 * @returns {Promise<Array>} - A promise that resolves to an array of members with upcoming birthdays.
 */
export const getUpcomingBirthdays = async (month: number) => {
  const { data: birthdays } = await window.backend.invoke(
    "birthdays:member",
    month,
  );
  return birthdays;
};
