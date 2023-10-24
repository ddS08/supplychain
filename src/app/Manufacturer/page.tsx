// ManufacturerDashboardPage.tsx
"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Manufacturer/dashboard.module.css';
import { getPublicKeyFromMetaMask } from '../backend/ethaddressreceiver';
import PopupCard from '../components/popupcard/popupcard';



function ManufacturerDashboardPage() {
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
      const role='Manufacturer';
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
          <ul className={styles['nav-links']}>
            <li>
              <Link href="/Manufacturer">Manufacturer Dashboard</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles['manufacturer-page']}>
      {isOverlayVisible && <div className={styles['overlay']} />}
        <h1 className={styles.h1}>Manufacturer Dashboard</h1>
        <div className={styles['function-cards']}>
          <Link href="/Manufacturer/buyrawmaterial">
            <div className={styles['function-card']}>
              <h2>Buy Raw Material</h2>
              <p>Buy raw material to manufacture medicines</p>
            </div>
          </Link>
          <Link href="/Manufacturer/sellmedicine">
            <div className={styles['function-card']}>
              <h2>Sell Medicine</h2>
              <p>Sell manufactured medicines</p>
            </div>
          </Link>
          <Link href="/Manufacturer/scanrawmaterial">
            <div className={styles['function-card']}>
              <h2>Scan Raw Material</h2>
              <p>Scan raw material for quality control</p>
            </div>
          </Link>
        </div>
      </div>
      {isPopupVisible && message &&  (
        <PopupCard message={message} />
      )}
    </div>
  );
}

export default ManufacturerDashboardPage;

