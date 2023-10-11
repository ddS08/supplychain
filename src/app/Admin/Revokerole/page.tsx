// RevokerRole.tsx
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Admin/Revokerole/Revokerole.module.css';

function RevokeRole() {
  const [userName, setUserName] = useState('');

  const handleRevokeRole = () => {
    // Implement your logic to revoke the role for the provided username
    console.log(`Revoking role for user: ${userName}`);
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
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            className={styles.input}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button className={styles.button} onClick={handleRevokeRole}>Revoke Role</button>
        </div>
      </div>
    </div>
  );
}

export default RevokeRole;
