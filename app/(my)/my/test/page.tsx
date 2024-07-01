'use client';

import AWS from 'aws-sdk';
import { useState } from 'react';

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

const TestPage = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [imageUrl, setImageUrl] = useState<string[]>([]);

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(selectedFiles);
        }
    };

    const uploadFiles = () => {
        if (files.length === 0) {
            alert('파일을 선택해주세요.');
            return;
        }

        files.forEach((file) => {
            const params = {
                Key: `upload/${file.name}`,
                Body: file,
                ACL: 'public-read',
                Bucket: bucketName,
            };

            // S3에 파일 업로드
            s3.upload(params, function (err: any, data: any) {
                if (err) {
                    console.error('파일 업로드 실패:', err);
                    alert(`${file.name} 파일 업로드에 실패했습니다.`);
                } else {
                    console.log(`${file.name} 파일 업로드 성공:`, data.Location);
                    setImageUrl((prev) => [...prev, data.Location]);
                }
            });
        });
    };

    console.log('저장된 Url : ', imageUrl);

    return (
        <div>
            <input type="file" onChange={handleFileInputChange} multiple />
            <button onClick={uploadFiles}>Upload Image</button>

            {imageUrl?.map((img) => (
                <img key={img} src={img} width="150" />
            ))}
        </div>
    );
};

export default TestPage;
