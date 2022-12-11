import { Provider } from '@nestjs/common';
import { v2, ConfigOptions } from 'cloudinary';

export const CloudinaryProvider: Provider = {
    provide: 'cloudinary',
    useFactory: (): ConfigOptions =>
        v2.config({
            cloud_name: process.env.CLOUDINARY_SERVICE_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        }),
};
