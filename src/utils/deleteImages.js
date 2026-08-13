import fs from "fs";
import path from "path";

export const deleteFile = (folder, filename) => {
  if (!filename) return;

  const filePath = path.join(process.cwd(), "uploads", folder, filename);

  fs.rmSync(filePath, { force: true });
};
export const deleteFiles = (folder, filenames) => {
  filenames.forEach((filename) => {
    const oldFilename = filename.split("/").pop();
    deleteFile(folder, oldFilename);
  });
};
