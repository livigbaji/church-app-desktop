import React from "react";
import { Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { uploadFile } from "@/services/uploadService";

interface CsvUploadProps {
  onFileSelected: (file: File) => void;
}

const CsvUpload: React.FC<CsvUploadProps> = () => {
  const handleUploadClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".csv, .xls, .xlsx";
    fileInput.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const filePath = file.path; // Get the file path (assuming you are in an environment that supports this)
        console.log("Selected file path:", filePath); // Log the file path to the console

        try {
          const fileData = await uploadFile(filePath); // Call the uploadFile function with the file path
          console.log("Upload result:", fileData); // Log the result from the upload
        } catch (error) {
          console.error("Error uploading file:", error); // Log any errors that occur during upload
        }
      } else {
        console.warn("No file selected."); // Warn if no file was selected
      }
    };
    fileInput.click();
  };

  return (
    <Button
      variant="outlined"
      startIcon={<UploadFileIcon sx={{ color: "#132034" }} />}
      sx={{
        marginRight: 2,
        backgroundColor: "#fff",
        borderColor: "#525252",
        color: "#132034",
        "&:hover": {
          backgroundColor: "#f0f0f0",
          borderColor: "#525252",
        },
        height: 56,
        minWidth: 180,
      }}
      onClick={handleUploadClick}
    >
      Upload CSV
    </Button>
  );
};

export default CsvUpload;
