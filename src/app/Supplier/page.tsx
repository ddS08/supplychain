// SupplierPage.tsx
import React from 'react';
import Link from 'next/link';
import styles from '../styles/Supplier/dashboard.module.css';

function SupplierPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/">PharmaChain</Link>
          </div>
          <ul className={styles['nav-links']}>
            <li>
              <Link href="/supplier">Supplier Dashboard</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles['supplier-page']}>
        <h1 className={styles.h1}>Supplier Dashboard</h1>
        <div className={styles['function-cards']}>
          <Link href="/Supplier/Createrawmaterial">
            <div className={styles['function-card']}>
              <h2>Create Raw Material</h2>
              <p>Create a new raw material entry</p>
            </div>
          </Link>
          <Link href="/supplier/sold-raw-materials">
            <div className={styles['function-card']}>
              <h2>Sold Raw Materials</h2>
              <p>View sold raw materials</p>
            </div>
          </Link>
          {/* Add more function cards as needed */}
        </div>
      </div>
    </div>
  );
}

export default SupplierPage;
