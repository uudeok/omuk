'use client';

import { useState, useRef, useCallback } from 'react';
import { DeleteObjectCommand, S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

type Options = {
    maxSize?: number;
};

const config = {
    region: 'ap-northeast-2',
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY!,
        secretAccessKey: process.env.NEXT_PUBLIC_SCREAT_KEY!,
    },
};

const bucketName = 's3-omuk-images';

export const useS3FileUpload = (options?: Options) => {
    const { maxSize } = options || {};
    const [files, setFiles] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const isValid = useRef<boolean>(true);

    const convertToFile = useCallback(async (imageFiles: any) => {
        if (!imageFiles.images_url || !Array.isArray(imageFiles.images_url)) {
            console.error('이미지 URL 배열이 유효하지 않습니다.');
            return [];
        }

        const filePromises = imageFiles.images_url.map(async (url: string) => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const blob = await response.blob();
                const filename = 'image_' + Date.now();
                const options = { type: blob.type, lastModified: new Date().getTime() };

                return new File([blob], filename, options);
            } catch (error: any) {
                console.error(`이미지 다운로드 실패: ${url}`, error);
                throw new Error(error.message);
            }
        });

        const results = await Promise.allSettled(filePromises);
        const validFiles = results
            .filter((result): result is PromiseFulfilledResult<File> => result.status === 'fulfilled')
            .map((result) => result.value);

        setFiles(validFiles);

        const failedDownloads = results.filter(
            (result) => result.status === 'rejected' || (result.status === 'fulfilled' && result.value === null)
        );
        if (failedDownloads.length > 0) {
            isValid.current = false;
            setAlertMessage('일부 이미지 다운로드에 실패했습니다.');
        }

        return validFiles;
    }, []);

    const handleFileInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                const selectedFiles = Array.from(e.target.files);

                if (maxSize === 1) {
                    // maxSize가 1일 때는 기존 파일을 대체하도록 수정
                    setFiles(selectedFiles);
                } else {
                    // 그 외의 경우는 파일을 추가
                    if (maxSize && files.length + selectedFiles.length > maxSize) {
                        isValid.current = false;
                        setAlertMessage(`최대 ${maxSize}개의 이미지만 업로드할 수 있습니다.`);
                        return;
                    }
                    setFiles((prev) => [...prev, ...selectedFiles]);
                }
            }
        },
        [maxSize, files.length]
    );

    const uploadFiles = useCallback(async () => {
        // 업로드 할 파일이 없으면 리턴한다
        if (files.length === 0) return;

        try {
            const urls: string[] = [];

            for (const file of files) {
                const data = new Upload({
                    client: new S3(config),
                    params: {
                        Key: `upload/${file.name}`,
                        Body: file,
                        Bucket: bucketName,
                    },
                });

                data.on('httpUploadProgress', (progress) => {
                    console.log('progress', progress);
                });

                const response = await data.done();
                urls.push(response.Location!);
            }

            setImageUrls(urls);
            return urls;
        } catch (error: any) {
            console.error('이미지 업로드 중 오류 발생:', error);
            throw new Error(error.message);
        }
    }, [files]);

    const deleteFile = useCallback(
        async (fileKey: string) => {
            const client = new S3(config);

            const command = new DeleteObjectCommand({
                Bucket: bucketName,
                Key: `upload/${fileKey}`,
            });

            try {
                const response = await client.send(command);
                console.log('res', response);
            } catch (err: any) {
                console.error(err);
                throw new Error(err.message);
            }
        },
        [config]
    );

    return {
        setFiles,
        files,
        imageUrls,
        handleFileInputChange,
        uploadFiles,
        isValid,
        alertMessage,
        convertToFile,
        deleteFile,
    };
};
