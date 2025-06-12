import JSZip from "jszip";
import { saveAs } from "file-saver";

export const handleZipFile = async (
  inputFiles: File | File[]
): Promise<void> => {
  const zip = new JSZip();
  const files: File[] = Array.isArray(inputFiles) ? inputFiles : [inputFiles];

  files.forEach((file: File) => {
    zip.file(file.name, file);
  });

  try {
    const zipBlob: Blob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "converted_files.zip");
  } catch (error) {
    console.error("Error generating ZIP file:", error);
  }
};

export const uploadToDrive = (token: string) => {
  const metadata = {
    name: "reformit_file.txt",
    mimeType: "text/plain",
  };

  const fileContent = new Blob(["Hello from Reformit!"], {
    type: "text/plain",
  });

  const form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  form.append("file", fileContent);

  fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
    {
      method: "POST",
      headers: new Headers({ Authorization: "Bearer " + token }),
      body: form,
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("Upload successful:", data);
      alert("File uploaded to Google Drive!");
    })
    .catch((err) => {
      console.error("Upload error:", err);
      alert("Upload failed.");
    });
};
