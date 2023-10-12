// SoldRawMaterialPage.tsx
"use client"
import React from 'react';
import Link from 'next/link';
import styles from './../../styles/Supplier/soldrawmaterial/soldrawmaterial.module.css';

function SoldRawMaterialPage() {
  // Sample data for sold raw materials
  const soldRawMaterials = [
    {
      name: 'Raw Material 1',
      quantity: 1000,
      quantitySold: 500,
      manufacturerName: 'Manufacturer 1',
    },
    {
      name: 'Raw Material 2',
      quantity: 800,
      quantitySold: 200,
      manufacturerName: 'Manufacturer 2',
    },
    // Add more data as needed
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/">PharmaChain</Link>
          </div>
          <ul className={styles['nav-links']}>
            <li>
              <Link href="/Supplier">Supplier Dashboard</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles['supplier-page']}>
        <h1 className={styles.h1}>Sold Raw Material</h1>
        <table className={styles['raw-material-table']}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Quantity Sold</th>
              <th>Manufacturer Name</th>
            </tr>
          </thead>
          <tbody>
            {soldRawMaterials.map((material, index) => (
              <tr key={index}>
                <td>{material.name}</td>
                <td>{material.quantity}</td>
                <td>{material.quantitySold}</td>
                <td>{material.manufacturerName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SoldRawMaterialPage;
