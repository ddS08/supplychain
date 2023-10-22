// SupplierPage.tsx
"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Supplier/dashboard.module.css';
import { getPublicKeyFromMetaMask } from '../backend/ethaddressreceiver';
import PopupCard from '../components/popupcard/popupcard';

function SupplierPage() {
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
      const role='Supplier';
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
              <Link href="/Supplier">Supplier Dashboard</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">UserInfo</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles['supplier-page']}>
      {isOverlayVisible && <div className={styles['overlay']} />}
        <h1 className={styles.h1}>Supplier Dashboard</h1>
        <div className={styles['function-cards']}>
          <Link href="/Supplier/Createrawmaterial">
            <div className={styles['function-card']}>
              <h2>Create Raw Material</h2>
              <p>Create a new raw material entry</p>
            </div>
          </Link>
          <Link href="/Supplier/Soldrawmaterial">
            <div className={styles['function-card']}>
              <h2>Sold Raw Materials</h2>
              <p>View sold raw materials</p>
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

export default SupplierPage;
