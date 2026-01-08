import multer, { StorageEngine } from "multer";
import path from "path";
import { Request } from "express";

const storage: StorageEngine = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb
  ) => {
    cb(null, "uploads/posts");
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    cb
  ) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.random()}${ext}`;
    cb(null, filename);
  },
});

export const upload = multer({ storage });
