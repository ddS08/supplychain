// ScanRawMaterial.tsx
"use client"
import React, { useState } from "react";
import Link from "next/link";
import styles from "./../../styles/Manufacturer/scanrawmaterial/scanrawmaterial.module.css";

function ScanRawMaterialPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [scannedRawMaterial, setScannedRawMaterial] = useState<null | { image: string; supplier: string; }>({ image: "", supplier: "" });

  // Function to handle scanning raw material (you can implement your scanning logic here)
  const handleScan = (rawMaterialId: string) => {
    // Simulating scanned data for demonstration
    const scannedData = {
      image: "rawmaterial1.jpg",
      supplier: "Supplier A",
    };

    setScannedRawMaterial(scannedData);
    setShowPopup(true);
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
              <Link href="/Manufacturer">Manufacturer Dashboard</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles["scan-raw-material-page"]}>
        <h1 className={styles.h1}>Scan Raw Material</h1>
        <div className={styles["scan-container"]}>
          <input
            type="text"
            id="rawMaterialId"
            className={styles["input"]}
            placeholder="Enter Raw Material ID"
          />
          <button
            className={styles["scan-button"]}
            onClick={() => handleScan((document.getElementById("rawMaterialId") as HTMLInputElement).value)}
          >
            Scan
          </button>
        </div>
      </div>
      {showPopup  && scannedRawMaterial !== null &&  (
        <div className={styles.popup}>
          <img src={`/${scannedRawMaterial.image}`} alt="Raw Material" className={styles['rawmaterial-image']} />
          <p>Supplier: {scannedRawMaterial.supplier}</p>
          <button className={styles["popup-close-button"]} onClick={closePopup}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default ScanRawMaterialPage;
