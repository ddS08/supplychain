"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './../../styles/Supplier/createrawmaterial/createrawmaterial.module.css';
import NoQRFoundpopup from '@/app/components/NoQRFoundpopup';

function CreateRawMaterialPage() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isQuantityValid, setIsQuantityValid] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [scannedMedicine, setScannedMedicine] = useState<null | { name: string }>({ name: '' });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageBuffer, setImageBuffer] = useState('');
  const [rawmaterial, setRawMaterial] = useState('');
  const [pop2,setpop2]= useState(false);

  const handleCreateMaterial = () => {
    // Implement your logic to create a raw material
    console.log(`Creating material: Name - ${name}, Quantity - ${quantity}`);
    setIsPopupVisible(false);
  };

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
      const id=responseData.id;
      console.log('Material ID:', materialId);
      console.log("id",id);
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

  const closePopup = () => {
    setShowPopup(false);
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

      {showPopup && (
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
      {pop2 && <NoQRFoundpopup onClose={() => setpop2(false)} message="No such QR found."/>}
    </div>
  );
}

export default CreateRawMaterialPage;
