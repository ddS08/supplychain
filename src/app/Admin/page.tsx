// pages/admin/AdminDashboard.js
import Link from 'next/link';
import styles from '../../app/styles/Admin/dashboard.module.css';

import React from 'react';

function AdminDashboard() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/">PharmaChain</Link>
          </div>
          <ul className={styles['nav-links']}>
            <li>
              <Link href="/admin/dashboard">Admin Dashboard</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles['admin-dashboard-page']}>
        <h1 className={styles.h1}>Welcome to Admin Dashboard</h1>
        <div className={styles['admin-functions']}>
          <Link href="/admin/register-user">
            <div className={styles['admin-function-card']}>
              <h2 className={styles.h2}>Register User</h2>
              <p className={styles.p}>Add a new user to the system.</p>
              <button className={styles.button}>Add User</button>
            </div>
          </Link>
          <Link href="/admin/reassign-role">
            <div className={styles['admin-function-card']}>
              <h2 className={styles.h2}>Reassign Role</h2>
              <p className={styles.p}>Change the role of an existing user.</p>
              <button className={styles.button}>Reassign Role</button>
            </div>
          </Link>
          <Link href="/admin/revoke-role">
            <div className={styles['admin-function-card']}>
              <h2 className={styles.h2}>Revoke Role</h2>
              <p className={styles.p}>Remove a role from an existing user.</p>
              <button className={styles.button}>Revoke Role</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
