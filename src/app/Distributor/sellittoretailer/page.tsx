// SellToRetailer.tsx
"use client"
import React, { useState } from "react";
import Link from "next/link";
import styles from "./../../styles/distributor/selltoretailer/selltoretailer.module.css";

function SellToRetailerPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [scannedMedicine, setScannedMedicine] = useState<null | { name: string }>({ name: "" });

  // Function to handle scanning QR code (you can implement your scanning logic here)
  const handleScan = (qrCode: string) => {
    // Simulating scanned data for demonstration
    const scannedData = {
      name: "Sample Medicine",
    };

    setScannedMedicine(scannedData);
    setShowPopup(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  // Retailers data for the dropdown
  const retailers = [
    "Retailer A",
    "Retailer B",
    "Retailer C",
  ];

  // Function to handle selling the medicine
  const handleSell = (retailer: string) => {
    // You can implement the logic for selling the medicine to the selected retailer here
    // This is a placeholder function for demonstration
    alert(`Selling ${scannedMedicine?.name} to ${retailer}`);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/">PharmaChain</Link>
          </div>
          <ul className={styles["nav-links"]}>
            <li>
              <Link href="/distributor">Distributor Dashboard</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles["sell-to-retailer-page"]}>
        <h1 className={styles.h1}>Sell to Retailer</h1>
        <div className={styles["scan-container"]}>
          <input
            type="text"
            id="qrCode"
            className={styles["input"]}
            placeholder="Scan QR Code"
          />
          <button
            className={styles["scan-button"]}
            onClick={() => handleScan((document.getElementById("qrCode") as HTMLInputElement).value)}
          >
            Scan
          </button>
        </div>
        {showPopup && scannedMedicine !== null && (
          <div className={styles.popup}>
            <p>Medicine Name: {scannedMedicine.name}</p>
            <div className={styles["retailer-dropdown"]}>
              <label htmlFor="retailer">Select Retailer:</label>
              <select id="retailer" className={styles["dropdown"]}>
                {retailers.map((retailer, index) => (
                  <option key={index} value={retailer}>
                    {retailer}
                  </option>
                ))}
              </select>
            </div>
            <button
              className={styles["sell-button"]}
              onClick={() => handleSell((document.getElementById("retailer") as HTMLSelectElement).value)}
            >
              Sell Medicine
            </button>
            <button className={styles["popup-close-button"]} onClick={closePopup}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellToRetailerPage;
