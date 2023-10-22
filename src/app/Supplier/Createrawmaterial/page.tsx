"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './../../styles/Supplier/createrawmaterial/createrawmaterial.module.css';

function CreateRawMaterialPage() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isQuantityValid, setIsQuantityValid] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [scannedMedicine, setScannedMedicine] = useState<null | { name: string }>({ name: "" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleCreateMaterial = () => {
    // Implement your logic to create a raw material
    console.log(`Creating material: Name - ${name}, Quantity - ${quantity}`);
    setIsPopupVisible(false);
  };

  const handleScan = (qrCode: string) => {
    // Simulating scanned data for demonstration
    console.log("qrcode,",qrCode);
    const imageInput = document.getElementById('#imageInput');

    const scannedData = {
      name: "Sample Medicine",
    };
    setScannedMedicine(scannedData);
    setShowPopup(true);
  }

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleQuantityChange = (e: any) => {
    const inputValue = e.target.value;
    const isValid = /^\d+$/.test(inputValue);
    setIsQuantityValid(isValid);
    setQuantity(inputValue);
  };

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
        <h1 className={styles.h1}>Create Raw Material</h1>
        <div className={styles["scan-container"]}>
          <input
            type="text"
            id="qrCode"
            className={styles["input"]}
            placeholder="Scan QR Code"
          />

          <label htmlFor="image" className={styles.label}>
            Image:
          </label>
          <input
            type="file"
            id="image"
            className={styles["input"]}
            accept="image/*"
            onChange={handleImageChange}
          />
          {selectedImage && (<div>
            <img src={selectedImage} id='SelectedImage' alt="Selected Image" className={styles["selected-image"]} />
            <input type="image" src={selectedImage} alt="Selected Image" className={styles["selected-image-input"]} />
            
                     </div>)}


          <button
            className={styles["scan-button"]}
            onClick={() => handleScan((document.getElementById("qrCode") as HTMLInputElement).value)}
          >
            Scan
          </button>
        </div>
      </div>

      {showPopup && scannedMedicine !== null && (
        <div className={styles.popup}>
          <label htmlFor="popup-name" className={styles.label}>
            Name:
          </label>
          <input
            type="text"
            id="popup-name"
            value={name}
            className={styles.input}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="popup-quantity" className={styles.label}>
            Quantity:
          </label>
          <input
            type="text"
            id="popup-quantity"
            value={quantity}
            className={styles.input}
            onChange={handleQuantityChange}
          />
          <button className={styles['sell-button']} onClick={handleCreateMaterial}>
            Sell
          </button>
          <button className={styles['popup-close-button']} onClick={closePopup}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateRawMaterialPage;
