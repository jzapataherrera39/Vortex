import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

import '../config/cloudinary';

export const uploadFromBuffer = (buffer: Buffer, folder: string): Promise<cloudinary.UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: folder },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export const deleteFromCloudinary = (publicId: string): Promise<any> => {
    return cloudinary.uploader.destroy(publicId);
}
