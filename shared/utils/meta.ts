import { META } from '@/constants/metadata';
import { Metadata } from 'next';

export type MetaDataType = {
    title: string;
    description: string;
    ogImage: string;
    asPath: string;
};

export const getMetadata = (metadataProps?: MetaDataType) => {
    const { title, description, ogImage, asPath } = metadataProps || {};

    const TITLE = title ? `${title} | 먹기록` : META.title;
    const DESCRIPTION = description || META.description;
    const PAGE_URL = asPath || META.url;
    const OG_IMAGE = ogImage || META.ogImage;

    const metadata: Metadata = {
        metadataBase: new URL(META.url),
        alternates: {
            canonical: PAGE_URL,
        },
        title: TITLE,
        description: DESCRIPTION,
        keywords: [...META.keyword],
        openGraph: {
            title: TITLE,
            description: DESCRIPTION,
            siteName: TITLE,
            locale: 'ko_KR',
            type: 'website',
            url: PAGE_URL,
            images: {
                url: OG_IMAGE,
            },
        },
        viewport: 'width=device-width, initial-scale=1.0',
    };

    return metadata;
};
