import styles from '../../styles/common/modal.module.css';
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    showCloseButton?: boolean;
};

const Modal = ({ isOpen, onClose, showCloseButton = true, children }: ModalProps) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {showCloseButton && (
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                )}

                {children}
            </div>
        </div>,
        document.getElementById('modal-root')!
    );
};

export default Modal;
