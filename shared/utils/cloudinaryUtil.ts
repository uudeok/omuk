import { Cloudinary } from '@cloudinary/url-gen';
import { fill, fit, crop, scale, pad, limitFit, minimumFit } from '@cloudinary/url-gen/actions/resize';

type ResizeMethod = 'fill' | 'thumbnail' | 'fit' | 'crop' | 'scale' | 'pad';

type CloudinaryOptions = {
    width?: number;
    height?: number;
    resizeMethod?: ResizeMethod;
    secure?: boolean;
};

const cld = new Cloudinary({
    cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        apiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
    },
});

export const cloudinaryUrl = (url: string, options: CloudinaryOptions = {}) => {
    const { width = 1200, height = 630, resizeMethod = 'fill', ...restOptions } = options;

    if (!url) {
        throw new Error('URL is required');
    }

    const transformationOptions = {
        fetch_format: 'auto',
        quality: 'auto',
        ...restOptions,
    };

    let resizeAction;
    switch (resizeMethod) {
        case 'fit':
            resizeAction = fit().width(width).height(height);
            break;
        case 'thumbnail':
            resizeAction = fit().width(width).height(height);
            break;
        case 'crop':
            resizeAction = crop().width(width).height(height);
            break;
        case 'scale':
            resizeAction = scale().width(width).height(height);
            break;
        case 'pad':
            resizeAction = pad().width(width).height(height);
            break;
        case 'fill':
        default:
            resizeAction = fill().width(width).height(height);
            break;
    }

    return cld
        .image(url)
        .resize(resizeAction)
        .format(transformationOptions.fetch_format)
        .quality(transformationOptions.quality)
        .toURL();
};
