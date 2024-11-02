export const uploadFile = async (filePath: string): Promise<string> => {
  try {
    const { status, data: fileData } = await window.ipcRenderer.invoke(
      "upload:sheet",
      filePath,
    );
    console.log("Here is the path: ", filePath);
    if (status !== "success") {
      throw new Error(`Upload failed with status: ${status}`);
    }

    return fileData;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
