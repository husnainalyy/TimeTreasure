/* This TypeScript code snippet is setting up a file upload configuration using the `multer` middleware
in an Express application. */
import multer from "multer";
import { Request } from "express";

// Setup multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

// File filter to allow only specific file types
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file format.'));
    }
};

// Multer upload configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 }, // 1MB file size limit
    fileFilter: fileFilter
});

export default upload;