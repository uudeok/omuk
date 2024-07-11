import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export const cloudinaryUrl = (url: string, options: any = {}) => {
    const transformationOptions = {
        ...options,
        fetch_format: 'auto',
        quality: 'auto',
    };

    return cloudinary.url(url, transformationOptions);
};
