// AdminReassignUser.tsx
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './../../styles/Admin/Reassignrole/Reassignrole.module.css';

function AdminReassignUser() {
  const [name, setName] = useState('');
  const [newRole, setNewRole] = useState('user');

  const roles = ['user', 'supplier', 'manufacturer', 'distributor', 'retailer'];

  const handleReassignUser = () => {
    // Implement your logic to reassign the role for the user with the given name
    console.log(`Reassigning role for user: ${name} to: ${newRole}`);
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
      <div className={styles['admin-reassign-user-page']}>
        <h1 className={styles.h1}>Reassign User</h1>
        <div className={styles['user-form']}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            className={styles.input}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="newRole">New Role:</label>
          <select
            id="newRole"
            value={newRole}
            className={styles.select}
            onChange={(e) => setNewRole(e.target.value)}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <button className={styles.button} onClick={handleReassignUser}>Reassign Role</button>
        </div>
      </div>
    </div>
  );
}

export default AdminReassignUser;
