export const uploadFile = async (filePath: string): Promise<string> => {
  try {
    const { success, data } = await window.backend.invoke(
      "upload:members",
      filePath,
    );

    console.log({f: data })
    console.log("Here is the path: ", filePath);
    if (!success) {
      throw new Error(`Upload failed`);
    }

    return data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
