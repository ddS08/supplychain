// ManufacturerDashboardPage.tsx
"use client"
import React from 'react';
import Link from 'next/link';
import styles from '../styles/Manufacturer/dashboard.module.css';



function ManufacturerDashboardPage() {
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
    </div>
  );
}

export default ManufacturerDashboardPage;

