'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { DeleteObjectCommand, S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { resizeFile } from '@/shared/utils/imageUtil';

type Options = {
    maxSize?: number;
};

const bucketName = 's3-omuk-images';
const config = {
    region: 'ap-northeast-2',
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SCREAT_KEY!,
    },
};

export const useS3FileUploader = (options?: Options) => {
    const { maxSize } = options || {};
    const isValid = useRef<boolean>(true);

    const [files, setFiles] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [alertMessage, setAlertMessage] = useState<string>('');

    const handleFileInputChange = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                const selectedFiles = Array.from(e.target.files);

                if (maxSize === 1) {
                    const url = selectedFiles.map((file) => URL.createObjectURL(file));
                    setFiles(selectedFiles); // File type 으로 저장
                    setImageUrls(url); // 임시 url 로 저장
                } else {
                    if (maxSize && imageUrls.length + selectedFiles.length > maxSize) {
                        isValid.current = false;
                        setAlertMessage(`최대 ${maxSize}개의 이미지만 업로드할 수 있습니다.`);
                        return;
                    }

                    setFiles((prev) => [...prev, ...selectedFiles]);

                    const newBlobUrls = selectedFiles.map((file) => URL.createObjectURL(file));
                    setImageUrls((prev) => [...prev, ...newBlobUrls]);
                }
            }
        },
        [maxSize, imageUrls.length]
    );

    const uploadFiles = useCallback(async () => {
        if (files.length === 0) return;

        try {
            const uploadPromises = files.map(async (file) => {
                const resizedFile = await resizeFile(file); // 파일 리사이즈 최적화 작업

                const data = new Upload({
                    client: new S3(config),
                    params: {
                        Key: `upload/${file.name.replace(/\.[^/.]+$/, '')}.webp`,
                        Body: resizedFile,
                        Bucket: bucketName,
                        ContentType: 'image/webp',
                        // CacheControl: 'no-store',
                    },
                });

                return data
                    .done()
                    .then((response) => {
                        // response.Location이 undefined인 경우 빈 문자열로 대체
                        return { status: 'fulfilled', url: response.Location || '' };
                    })
                    .catch((error) => {
                        return { status: 'rejected', reason: error.message };
                    });
            });

            const results = await Promise.allSettled(uploadPromises);

            const urls = results
                .filter((result) => result.status === 'fulfilled')
                .map((result) => (result as PromiseFulfilledResult<{ url: string }>).value.url);

            // 실패한 작업에 대한 로그 또는 처리
            results
                .filter((result) => result.status === 'rejected')
                .forEach((result) => console.error('업로드 실패:', (result as PromiseRejectedResult).reason));

            return urls;
        } catch (error: any) {
            console.error('이미지 업로드 중 오류 발생:', error);
            throw new Error(error.message);
        }
    }, [files]);

    const deleteFiles = useCallback(async (deleteImages: string[]) => {
        const client = new S3(config);

        try {
            const deletePromises = deleteImages.map(async (imgUrl) => {
                // URL에서 파일 이름 추출 (URL이 아닌 파일 이름이 필요)
                const fileName = imgUrl.split('/').pop()!;

                const command = new DeleteObjectCommand({
                    Bucket: bucketName,
                    Key: `upload/${fileName}`,
                });

                // 파일 삭제
                await client.send(command);

                // 상태 업데이트
                setFiles((prev) => prev.filter((file) => URL.createObjectURL(file) !== imgUrl));
                setImageUrls((prev) => prev.filter((url) => url !== imgUrl));

                // Object URL 해제
                URL.revokeObjectURL(imgUrl);
            });

            // 모든 삭제 작업이 완료될 때까지 기다림
            await Promise.all(deletePromises);
        } catch (err: any) {
            console.error(err);
            throw new Error(err.message);
        }
    }, []);

    useEffect(() => {
        return () => {
            imageUrls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [imageUrls]);

    return {
        imageUrls,
        setImageUrls,
        handleFileInputChange,
        uploadFiles,
        isValid,
        alertMessage,
        deleteFiles,
        setFiles,
    };
};

// const uploadFiles = useCallback(async () => {
//     if (files.length === 0) return;

//     try {
//         const uploadPromises = files.map(async (file) => {
//             const resizedFile = await resizeFile(file); // 파일 리사이즈 최적화 작업

//             const data = new Upload({
//                 client: new S3(config),
//                 params: {
//                     Key: `upload/${file.name.replace(/\.[^/.]+$/, '')}.webp`,
//                     Body: resizedFile,
//                     Bucket: bucketName,
//                     ContentType: 'image/webp',
//                     CacheControl: 'no-store',
//                 },
//             });

//             return data.done().then((response) => {
//                 // response.Location이 undefined인 경우 빈 문자열로 대체
//                 return response.Location || '';
//             });
//         });

//         // 모든 업로드 작업이 완료될 때까지 기다림
//         const urls: string[] = await Promise.all(uploadPromises);

//         return urls;
//     } catch (error: any) {
//         console.error('이미지 업로드 중 오류 발생:', error);
//         throw new Error(error.message);
//     }
// }, [files]);
