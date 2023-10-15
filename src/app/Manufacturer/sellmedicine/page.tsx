// SellMedicine.tsx
"use client"
import React from "react";
import Link from "next/link";
import styles from "./../../styles/Manufacturer/sellmedicine/sellmedicine.module.css";
function getTomorrow() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Add one day to today's date
    return tomorrow.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
  }
  
  function getToday() {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
  }
  
function SellMedicinePage() {
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
      <div className={styles['sell-medicine-page']}>
        <h1 className={styles.h1}>Sell Medicine</h1>
        <div className={styles['medicine-card']}>
          <form>
            <div className={styles['input-field']}>
              <label htmlFor="medicineName" className={styles['input-label']}>
                Medicine Name:
              </label>
              <input
                type="text"
                id="medicineName"
                className={styles['input']}
                placeholder="Enter medicine name"
              />
            </div>
            <div className={styles['input-field']}>
                <label htmlFor="manufacturingDate" className={styles['input-label']}>
                    Manufacturing Date:
                </label>
                <input
                    type="date"
                    id="manufacturingDate"
                    className={styles['input']}
                    max={getToday()} // Function to calculate the date of tomorrow
                />
                </div>

                <div className={styles['input-field']}>
                <label htmlFor="expiryDate" className={styles['input-label']}>
                    Expiry Date:
                </label>
                <input
                    type="date"
                    id="expiryDate"
                    className={styles['input']}
                    min= {getTomorrow()}// Function to calculate today's date
                />
            </div>

            <div className={styles['input-field']}>
              <label htmlFor="tabletsPerPack" className={styles['input-label']}>
                Tablets per Pack:
              </label>
              <input
                type="number"
                id="tabletsPerPack"
                className={styles['input']}
                placeholder="Enter the number of tablets per pack"
              />
            </div>
            <div className={styles['input-field']}>
              <label htmlFor="costPerPack" className={styles['input-label']}>
                Cost per Pack:
              </label>
             
              <input
                type="number"
                id="costPerPack"
                className={styles['input']}
                placeholder="Enter the cost per pack"
              />
            </div>
            <div className={styles['input-field']}>
              <label htmlFor="distributor" className={styles['input-label']}>
                Distributor:
              </label>
              <select id="distributor" className={styles['input']}>
                <option value="distributor1">Distributor 1</option>
                <option value="distributor2">Distributor 2</option>
                <option value="distributor3">Distributor 3</option>
              </select>
            </div>
            <div className={styles['input-field']}>
              <label htmlFor="medicineImage" className={styles['input-label']}>
                Medicine Image:
              </label>
              <input
                type="file"
                id="medicineImage"
                accept="image/*"
                className={styles['input-field-image']}
              />
            </div>
            <button className={styles['sell-button']}>Sell Medicine</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SellMedicinePage;
