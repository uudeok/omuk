'use clinet';

import styles from '../../styles/common/previewImage.module.css';
import Image from 'next/image';
import Button from './Button';

type Props = {
    imageUrl: string;
    removeImage: (file: string) => void;
};

const PreviewImage = ({ imageUrl, removeImage }: Props) => {
    return (
        <div className={styles.slideImg}>
            <Image src={imageUrl} width={160} height={160} alt={`image${imageUrl}`} />
            <Button size="sm" role="round" onClick={() => removeImage(imageUrl)}>
                x
            </Button>
        </div>
    );
};

export default PreviewImage;
