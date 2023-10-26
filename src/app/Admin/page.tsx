"use client"
import Link from 'next/link';
import styles from '../../app/styles/Admin/dashboard.module.css';

import React, { useEffect, useState } from 'react';
import { getPublicKeyFromMetaMask } from '../backend/ethaddressreceiver';
import PopupCard from '../components/popupcard/popupcard';
import { MANctr, RMSctr } from '../contracts/connect';




function AdminDashboard() {
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
      const role='Admin';
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

 const closePopup = () => {
   // Close the pop-up when the "OK" button is clicked
   setIsPopupVisible(false);
   setIsOverlayVisible(false);
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
      
      <div className={styles['admin-dashboard-page']}>
      {isOverlayVisible && <div className={styles['overlay']} />}
        <h1 className={styles.h1}>Welcome to Admin Dashboard</h1>
        <div className={styles['admin-functions']}>
          <Link href="/Admin/RegisterUser">
            <div className={styles['admin-function-card']}>
              <h2 className={styles.h2}>Register User</h2>
              <p className={styles.p}>Add a new user to the system.</p>
              <button className={styles.button}>Add User</button>
            </div>
          </Link>
          <Link href="/Admin/Reassignrole">
            <div className={styles['admin-function-card']}>
              <h2 className={styles.h2}>Reassign Role</h2>
              <p className={styles.p}>Change the role of an existing user.</p>
              <button className={styles.button}>Reassign Role</button>
            </div>
          </Link>
          <Link href="/Admin/Revokerole">
            <div className={styles['admin-function-card']}>
              <h2 className={styles.h2}>Revoke Role</h2>
              <p className={styles.p}>Remove a role from an existing user.</p>
              <button className={styles.button}>Revoke Role</button>
              
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

export default AdminDashboard;
