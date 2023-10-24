// sell-item.tsx
"use client"
import React, { useState } from "react";
import Link from "next/link";
import styles from "./../../styles/retailer/sellanitem/sellanitem.module.css";
import NoQRFoundpopup from "@/app/components/NoQRFoundpopup";

function SellItemPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [scannedItemName, setScannedItemName] = useState<string | null>(null);
  const [costPerPack, setCostPerPack] = useState<number | null>(null);
  const scannedData = {
    name: "Sample Item",
  };
  // Function to handle scanning QR code (you can implement your scanning logic here)
  const [imageBuffer, setImageBuffer] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [rawMaterialId, setRawMaterialId] = useState('');
  const [isQRVisible, setIsQRVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [qrImage, setQrImage] = useState('');
  const [rawmaterial, setRawMaterial] = useState('');
  const [pop2,setpop2]= useState(false);
  const [pop3,setpop3]= useState(false);

  const [scannedMedicine, setScannedMedicine] = useState<null | { name: string }>({ name: "" });

  // Function to handle scanning QR code (you can implement your scanning logic here)
  const handleRawMaterial = () => {
    const qrCodeInput = document.getElementById('qrC') as HTMLInputElement;
    console.log(qrCodeInput);
    if (qrCodeInput && qrCodeInput.value) {
      console.log(qrCodeInput.value);
      setRawMaterial(qrCodeInput.value);
    }
    handleScan(qrCodeInput.value);
  };

  const handleScan = async (rawmaterialval:string) => {
    // Simulating scanned data for demonstration
    try {
      console.log('QR Code:', rawmaterialval);
      console.log('Image:', imageBuffer);
  
    const response = await fetch('/api/check-qr-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rawmaterialval, imageBuffer }),
    });

    if (response.status === 200) {
      // Request was successful, you can handle success here
      const responseData = await response.json();
      console.log('QR Code found successfully:', responseData);

      // Access the materialId from the response
      const materialId = responseData.materialId;
      console.log('Material ID:', materialId);
      setShowPopup(true);
    } else {
      // Handle any errors here
      console.error('Error inserting QR Code.');
      setpop2(true);
    }
  } catch (error) {
    console.error('Error:', error);
  }
    
  };
  const handleSell = () => {
    // You can implement the logic for selling the medicine to the selected retailer here
    // This is a placeholder function for demonstration
  };
  const handleImageInputChange = (event: any) => {
    const file = event.target.files[0];
    const files = event.target.files && event.target.files[0];
    if (files) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        if (e.target) {
          let base64String = e.target.result as string;
          if (base64String.startsWith('data:image/png;base64,')) {
            base64String = base64String.slice('data:image/png;base64,'.length);
          }
          setImageBuffer(base64String);
        }
      };
  
      reader.readAsDataURL(file);
    }
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
      {(!showPopup && 
      <div>
        <h1 className={styles.h1}>Sell to retailer</h1>
        <div className={styles['scan-container']}>
          <input
            type="text"
            id="qrC"
            className={styles['input']}
            placeholder="Scan QR Code"
          />

          <label htmlFor="image" className={styles.label}>
            Image:
          </label>
          <input
            type="file"
            id="image"
            className={styles['input']}
            accept="image/*"
            onChange={handleImageInputChange}
          />
          {selectedImage && (
            <div>
              <img src={selectedImage} alt="Selected Image" className={styles['selected-image']} />
            </div>
          )}

          <button className={styles['scan-button']} onClick={handleRawMaterial}>
            Scan
          </button>
        </div>
      </div>
      )}
        </div>
        {showPopup && scannedMedicine !== null && (
          <div className={styles.popup}>
            <p>Medicine Name: {scannedMedicine.name}</p>
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
              onClick={() => handleSell()}
            >
              Sell Medicine
            </button>
            <button className={styles["popup-close-button"]} onClick={closePopup}>
              Close
            </button>
          </div>
        )}
        {pop2 && <NoQRFoundpopup onClose={() => setpop2(false)} message="No such QR found."/>}
      {pop3 && <NoQRFoundpopup onClose={() => setpop3(false)} message="No Retailers found."/>}
    </div>
  );
}

export default SellItemPage;
