// src/utils/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
});

interface UploadResult {
    public_id: string;
    url: string;
}

const uploads = (file: string, folder: string): Promise<UploadResult> => {
    return new Promise<UploadResult>((resolve, reject) => {
        cloudinary.uploader.upload(
            file,
            {
                resource_type: "auto",
                folder: folder
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        public_id: result?.public_id ?? '',
                        url: result?.url ?? ''
                    });
                }
            }
        );
    });
};

export { uploads };