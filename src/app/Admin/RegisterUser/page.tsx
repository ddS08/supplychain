// AdminRegisterUser.tsx
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './../../../app/styles/Admin/RegisterUser/RegisterUser.module.css';

function AdminRegisterUser() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');

  const roles = ['user', 'supplier', 'manufacturer', 'distributor', 'retailer'];

  const handleAddUser = () => {
    // Implement your logic to add a new user with the given name and role
    console.log(`Adding user: ${name} with role: ${role}`);
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
          <button className={styles.button} onClick={handleAddUser}>Add User</button>
        </div>
      </div>
    </div>
  );
}

export default AdminRegisterUser;
