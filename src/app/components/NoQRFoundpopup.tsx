import React from 'react';
import styles from './NoQRFoundpopup.module.css';
interface NoQRPopupProps {
    message: string; // Specify the type as string
    onClose: () => void;
}
const NoQRPopup: React.FC<NoQRPopupProps> = ({ message, onClose }) => (
    <div className={styles.popup}>
        <p className={styles['popup-message']}>{message}</p>
        <button className={styles['popup-close-button']} onClick={onClose}>
            Close
        </button>
    </div>
);

export default NoQRPopup;
