// Distributor.tsx
import React from "react";
import Link from "next/link";
import styles from "./../styles/distributor/distributor.module.css";

function DistributorPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/">PharmaChain</Link>
          </div>
          <ul className={styles["nav-links"]}>
            <li>
              <Link href="/Distributor">Distributor Dashboard</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles["distributor-page"]}>
        <h1 className={styles.h1}>Distributor Dashboard</h1>
        <div className={styles['function-cards']}>
          <Link href="/Distributor/scanqr">
            <div className={styles['function-card']}>
            <h2>Scan QR Code</h2>
            <p>Scan a QR code for a raw material.</p>
            </div>
          </Link>
          <Link href="/Distributor/scanqrandsell">
            <div className={styles['function-card']}>
            <h2>Scan QR Code and Sell it to Retailer</h2>
            <p>Scan a QR code for a raw material and send it to the retailer.</p>
            </div>
          </Link>
      </div>
      </div>
    </div>
  );
}

export default DistributorPage;
