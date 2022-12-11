/*
https://docs.nestjs.com/providers#services
*/
import { UploadApiErrorResponse, UploadApiResponse, UploadApiOptions, v2 } from 'cloudinary';
import { Injectable } from '@nestjs/common';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
    async uploadImage(
        file: Express.Multer.File,
        option: UploadApiOptions = {},
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream(option, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
            toStream(file.buffer).pipe(upload);
        });
    }
}
