import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';

const cld = new Cloudinary({
    cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        apiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
    },
});

export const cloudinaryUrl = (url: string, options: any = {}) => {
    const transformationOptions = {
        ...options,
        fetch_format: 'auto',
        quality: 'auto',
    };

    return cld
        .image(url)
        .resize(fill().width(transformationOptions.width).height(transformationOptions.height))
        .format(transformationOptions.fetch_format)
        .quality(transformationOptions.quality)
        .toURL();
};
