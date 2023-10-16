// Retailer.tsx
"use client"
import React from "react";
import Link from "next/link";
import styles from "./../styles/retailer/retailer.module.css";

function RetailerPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/">PharmaChain</Link>
          </div>
          <ul className={styles["nav-links"]}>
            <li>
              <Link href="/Retailer">Retailer Dashboard</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles["retailer-page"]}>
        <h1 className={styles.h1}>Retailer Dashboard</h1>

        <div className={styles['function-cards']}>
          <Link href="/Retailer/scanqr">
            <div className={styles['function-card']}>
                <h2>Scan QR</h2>
                <p>Click to scan QR code</p>
            </div>
          </Link>
          <Link href="/Retailer//sellanitem">
            <div className={styles['function-card']}>
                <h2>Sell Item</h2>
                <p>Click to sell an item</p>
            </div>
          </Link>
          </div>
      </div>
    </div>
  );
}

export default RetailerPage;
