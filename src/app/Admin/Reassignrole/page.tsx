// AdminReassignUser.tsx
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './../../styles/Admin/Reassignrole/Reassignrole.module.css';
import PopupCard from '../popupcard';


function AdminReassignUser() {

  const [message, setMessage] = useState(''); 
  const [role, setRole] = useState('user');
  const [key, setKey] = useState('');
  const [showPopup, setShowPopup] = useState(false);
   
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const roles = ['Supplier', 'Manufacturer', 'Distributor', 'Retailer'];

  const handleSubmit = async () => {
    const response = await fetch('/api/reassign-role', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({key, role }),
    });
    
    console.log("response");
    if (response.ok) {
      setMessage('User role reassigned successfully'); // Update the message
    } else {
      setMessage('Failed to reassign role(Maybe theres no such user)'); // Update the message
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
      <div className={styles['admin-reassign-user-page']}>
        <h1 className={styles.h1}>Reassign User</h1>
        <div className={styles['user-form']}>
          <label htmlFor="key">Key:</label>
          <input
            type="text"
            id="Key"
            value={key}
            className={styles.input}
            onChange={(e) => setKey(e.target.value)}
          />
          <label htmlFor="newRole">New Role:</label>
          <select
            id="newRole"
            value={role}
            className={styles.select}
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <button className={styles.button} onClick={handleSubmit}>Reassign Role</button>
        </div>
      </div>
      {isPopupVisible && (
        <PopupCard message={message} onOKClick={closePopup} />
      )}
    </div>
  );
}

export default AdminReassignUser;
