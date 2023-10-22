// RevokerRole.tsx
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Admin/Revokerole/Revokerole.module.css';
import PopupCard from '../popupcard';


function RevokeRole() {
  const [key, setkey] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleRevokeRole = async() => {
    
    const response = await fetch('/api/revoke-role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({key }),
      
   });
   
   console.log("response",response);
   if (response) {
     setMessage('User role revoked successfully'); // Update the message
   } else {
     setMessage('Failed to add user(Maybe theres no such user)'); // Update the message
   }
   setIsPopupVisible(true);
   setShowPopup(true);
  };
  const handleOKClick = () => {
   // Hide the pop-up
   setShowPopup(false);

   // Reload the page
   window.location.reload();
 };
 const closePopup = () => {
   // Close the pop-up when the "OK" button is clicked
   setIsPopupVisible(false);
 }
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/">PharmaChain</Link>
          </div>
          <ul className={styles['nav-links']}>
            <li>
              <Link href="/Admin">Admin Dashboard</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles['revoke-role-page']}>
        <h1 className={styles.h1}>Revoke Role</h1>
        <div className={styles['user-form']}>
          <label htmlFor="key">Key:</label>
          <input
            type="text"
            id="key"
            value={key}
            className={styles.input}
            onChange={(e) => setkey(e.target.value)}
          />
          <button className={styles.button} onClick={handleRevokeRole}>Revoke Role</button>
        </div>
      </div>
      {isPopupVisible && (
        <PopupCard message={message} onOKClick={closePopup} />
      )}
    </div>
  );
}

export default RevokeRole;
