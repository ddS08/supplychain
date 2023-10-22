// Distributor.tsx
"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./../styles/distributor/distributor.module.css";
import PopupCard from "../components/popupcard/popupcard";
import { getPublicKeyFromMetaMask } from "../backend/ethaddressreceiver";

function DistributorPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  useEffect(() => {
    // This code will run when the component is first loaded
    handleSubmit();
  }, []);
  const handleSubmit = async () => {
    let key;
    try {
      const publicKey = await getPublicKeyFromMetaMask();
      key=publicKey;
      const role='Distributor';
      const response = await fetch('/api/check-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({key, role }),
     });
     if (response.status === 200) {
      
    } else {
      setMessage('You do not have the necessary role to access these actions.'); // Update the message
      setIsOverlayVisible(true);
    }
  }
   catch (error) {
      console.error('Error:', error);
      
}
setIsPopupVisible(true);
   setShowPopup(true);
   
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/">PharmaChain</Link>
          </div>
          <ul className={styles["nav-links"]}>
            <li>
              <Link href="/Distributor">Distributor Dashboard</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles["distributor-page"]}>
        <h1 className={styles.h1}>Distributor Dashboard</h1>
        <div className={styles['function-cards']}>
          <Link href="/Distributor/scanqr">
            <div className={styles['function-card']}>
            <h2>Scan QR Code</h2>
            <p>Scan a QR code for a raw material.</p>
            </div>
          </Link>
          <Link href="/Distributor/sellittoretailer">
            <div className={styles['function-card']}>
            <h2>Scan QR Code and Sell it to Retailer</h2>
            <p>Scan a QR code for a raw material and send it to the retailer.</p>
            </div>
          </Link>
      </div>
      </div>
      {isPopupVisible && message &&  (
        <PopupCard message={message} />
      )};
    </div>
  );
}

export default DistributorPage;
