import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

interface UploadResult {
    public_id: string;
    url: string;
}

const uploads = (file: Buffer, folder: string): Promise<UploadResult> => {
    return new Promise<UploadResult>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { resource_type: "auto", folder: folder },
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
        ).end(file); // End the stream with the file buffer
    });
};

export { uploads };
