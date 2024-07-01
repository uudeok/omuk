'use client';

import { useState, useRef, useCallback } from 'react';
import AWS from 'aws-sdk';
import { ReviewImageType } from '@/services/imageService';

type Options = {
    maxSize?: number;
};

AWS.config.update({
    region: process.env.NEXT_PUBLIC_REGION,
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_SCREAT_KEY,
});

const bucketName = 's3-omuk-images';

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: bucketName },
});

export const useS3FileUpload = (options?: Options) => {
    const { maxSize } = options || {};
    const [files, setFiles] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [alertMessage, setAlertMessage] = useState('');
    const isValid = useRef<boolean>(true);

    const convertToFile = useCallback(async (imageFiles: any) => {
        if (!imageFiles.images_url || !Array.isArray(imageFiles.images_url)) {
            console.error('Invalid Image URL Array');
            return [];
        }

        const filePromises = imageFiles.images_url.map(async (url: string) => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const blob = await response.blob();
                const filename = 'image_' + Date.now() + '.jpg';
                const options = { type: blob.type, lastModified: new Date().getTime() };

                const file = new File([blob], filename, options);
                return file;
            } catch (error) {
                console.error(`이미지 다운로드 실패: ${url}`, error);
                return null;
            }
        });
        const files = await Promise.all(filePromises);
        const validFiles = files.filter((file) => file !== null);
        setFiles(validFiles);

        return validFiles;
    }, []);

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);

            if (maxSize && files.length + selectedFiles.length > maxSize) {
                isValid.current = false;
                setAlertMessage(`최대 ${maxSize}개의 이미지만 업로드할 수 있습니다.`);
                return;
            }

            setFiles((prev) => [...prev, ...selectedFiles]);
        }
    };

    const uploadFiles = async () => {
        if (files.length === 0) return;

        try {
            const urls: string[] = [];

            for (const file of files) {
                const params = {
                    Key: `upload/${file.name}`,
                    Body: file,
                    ACL: 'public-read',
                    Bucket: bucketName,
                };

                const data = await new Promise<AWS.S3.ManagedUpload.SendData>((resolve, reject) => {
                    s3.upload(params, (err: any, data: AWS.S3.ManagedUpload.SendData) => {
                        if (err) {
                            console.error(`${file.name} 파일 업로드에 실패했습니다.`, err);
                        } else {
                            console.log(`${file.name} 파일 업로드 성공:`, data.Location);
                            resolve(data);
                        }
                    });
                });

                urls.push(data.Location);
            }

            setImageUrls(urls);
            return urls;
        } catch (error) {
            console.error('이미지 업로드 중 오류 발생:', error);
            setAlertMessage('이미지 업로드 중 오류가 발생했습니다.');
        }
    };

    return {
        setFiles,
        files,
        imageUrls,
        handleFileInputChange,
        uploadFiles,
        isValid,
        alertMessage,
        convertToFile,
    };
};
