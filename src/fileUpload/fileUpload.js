import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../utils/appError.js";

const fileUpload = (folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folderName}`);
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("images only", 400), false);
    }
  }

  const upload = multer({
    storage: storage,
    fileFilter,
  });

  return upload;
};

export const uploadSingleFile = (fieldname, folderName) => {
  return fileUpload(folderName).single(fieldname);
};
export const uploadMixOfFile = (arrayOfFields, folderName) => {
  return fileUpload(folderName).fields(arrayOfFields);
};
