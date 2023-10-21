import React from 'react';
import styles from './popupcard.module.css'; // Import the CSS module

interface PopupCardProps {
  message: string;
  onOKClick: () => void;
}

function PopupCard({ message, onOKClick }: PopupCardProps) {
  return (
    <div className={styles.popupCard}> {/* Use the CSS module class */}
      <div className={styles.popupContent}> {/* Use the CSS module class */}
        <p>{message}</p>
        <button onClick={onOKClick} className={styles.okButton}> {/* Use the CSS module class */}
          OK
        </button>
      </div>
    </div>
  );
}

export default PopupCard;
