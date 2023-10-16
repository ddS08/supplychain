// sell-item.tsx
"use client"
import React, { useState } from "react";
import Link from "next/link";
import styles from "./../../styles/retailer/sellanitem/sellanitem.module.css";

function SellItemPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [scannedItemName, setScannedItemName] = useState<string | null>(null);
  const [costPerPack, setCostPerPack] = useState<number | null>(null);

  // Function to handle scanning QR code (you can implement your scanning logic here)
  const handleScan = (qrCode: string) => {
    // Simulating scanned data for demonstration
    const scannedData = {
      name: "Sample Item",
    };

    setScannedItemName(scannedData.name);
    setShowPopup(true);
  };

  // Function to handle selling the item
  const handleSellItem = () => {
    // You can implement the logic for selling the item here
    // This is a placeholder function for demonstration
    console.log("Selling", scannedItemName, "at cost", costPerPack);
  };

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
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
              <Link href="/retailer">Retailer Dashboard</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles["sell-item-page"]}>
        <h1 className={styles.h1}>Sell Item</h1>
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
        {showPopup && scannedItemName !== null && (
          <div className={styles.popup}>
            <p>Item Name: {scannedItemName}</p>
            <input
              type="number"
              id="costPerPack"
              className={styles["cost-input"]}
              placeholder="Cost Per Pack"
              onChange={(e) => setCostPerPack(parseFloat(e.target.value))}
            />
            <button
              className={styles["sell-button"]}
              onClick={handleSellItem}
            >
              Sell Item
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

export default SellItemPage;
