// AdminRegisterUser.tsx
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './../../../app/styles/Admin/RegisterUser/RegisterUser.module.css';
import PopupCard from '../popupcard';

function AdminRegisterUser() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const [key, setKey] = useState('');
  const [message, setMessage] = useState(''); 
  const [showPopup, setShowPopup] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State to control pop-up visibility 
  const roles = ['Supplier', 'Manufacturer', 'Distributor', 'Retailer'];

  const handleSubmit = async () => {
    const response = await fetch('/api/add-data', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ name, key, role }),
    });
    if (response.ok) {
      setMessage('User added successfully'); // Update the message
    } else {
      setMessage('Failed to add user'); // Update the message
    }setIsPopupVisible(true);
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
      <div className={styles['admin-register-user-page']}>
        <h1 className={styles.h1}>Register User</h1>
        <div className={styles['user-form']}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            className={styles.input}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="role">Role:</label>
          <select
            id="role"
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
          <label htmlFor="key">Key:</label>
          <input
            type="text"
            id="key"
            value={key}
            className={styles.input}
            onChange={(e) => setKey(e.target.value)}
          /><button className={styles.button} type="button" onClick={handleSubmit}>
          Add User
         </button>
         
        </div>
      </div>
      {isPopupVisible && (
        <PopupCard message={message} onOKClick={closePopup} />
      )}
    </div>
    
  );
}

export default AdminRegisterUser;


