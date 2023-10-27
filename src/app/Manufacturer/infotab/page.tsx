// InfoTabPage.tsx
"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/Manufacturer/infotab/infotab.module.css';
import { getPublicKeyFromMetaMask } from '@/app/backend/ethaddressreceiver';
import { getManuinfo } from '@/app/contracts/connect';

function InfoTabPage() {
  const soldData = [
    { medicine: 'Medicine A', quantity: 100, status: 'Sold' },
    { medicine: 'Medicine B', quantity: 50, status: 'Unsold' },
    { medicine: 'Medicine C', quantity: 75, status: 'Sold' },
    // Add more data as needed
  ];
  useEffect(() => {
    const fetchData = async () => {
      // This code will run when the component is first loaded
      const publicKey = await getPublicKeyFromMetaMask();
      console.log("Asd",publicKey);
      const val = await getManuinfo(publicKey);
      console.log(val);
      // You can set the state or do other things with 'val' here
    };
  
    fetchData();
  }, []);
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/ManufacturerDashboardPage">PharmaChain</Link>
          </div>
          <ul className={styles['nav-links']}>
            <li>
              <Link href="/ManufacturerDashboardPage">Manufacturer Dashboard</Link>
            </li>
            <li>
              <Link href="/InfoTabPage">Info Tab</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles['manufacturer-page']}>
        <h1 className={styles.h1}>Info Tab</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {soldData.map((data, index) => (
              <tr key={index}>
                <td>{data.medicine}</td>
                <td>{data.quantity}</td>
                <td>{data.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InfoTabPage;
