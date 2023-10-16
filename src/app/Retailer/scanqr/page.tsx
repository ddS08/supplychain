// ScanQR.tsx (for Distributor)
"use client"
import React, { useState } from "react";
import Link from "next/link";
import styles from "./../../styles/distributor/scanqr/scanqr.module.css" 

function ScanQRPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [scannedQRData, setScannedQRData] = useState<null | { image: string; medicine: string; manufacturer: string; manufacturingDate: string;DistributorName: string; expiryDate: string; }>({ 
    image: "", 
    medicine: "", 
    manufacturer: "", 
    manufacturingDate: "",
    DistributorName:"", 
    expiryDate: "" 
  });

  // Function to handle scanning QR code (you can implement your scanning logic here)
  const handleScan = (qrCode: string) => {
    // Simulating scanned data for demonstration
    const scannedData = {
      image: "medicine1.jpg",
      medicine: "Medicine X",
      manufacturer: "Manufacturer A",
      manufacturingDate: "2023-09-15",
      DistributorName:"Distributor 1",
      expiryDate: "2024-09-15",
    };

    setScannedQRData(scannedData);
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
              <Link href="/Retailer">Retailer Dashboard</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles["scan-qr-page"]}>
        <h1 className={styles.h1}>Scan QR Code</h1>
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
      </div>
      {showPopup && scannedQRData !== null && (
        <div className={styles.popup}>
          <img src={`/${scannedQRData.image}`} alt="Medicine" className={styles['medicine-image']} />
          <p>Medicine: {scannedQRData.medicine}</p>
          <p>Manufacturer: {scannedQRData.manufacturer}</p>
          <p>Distributor: {scannedQRData.DistributorName}</p>
          <p>Manufacturing Date: {scannedQRData.manufacturingDate}</p>
          <p>Expiry Date: {scannedQRData.expiryDate}</p>
          <button className={styles["popup-close-button"]} onClick={closePopup}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default ScanQRPage;
