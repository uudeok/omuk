import Resizer from 'react-image-file-resizer';

export const resizeFile = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        Resizer.imageFileResizer(
            file,
            450, // 최대 너비
            450, // 최대 높이
            'webp', // 포맷
            100, // 품질
            0, // 회전 각도
            (uri) => {
                if (uri instanceof Blob) {
                    resolve(uri);
                } else {
                    reject(new Error('Resized image is not a Blob'));
                }
            },
            'blob' // 반환 타입
        );
    });
};
