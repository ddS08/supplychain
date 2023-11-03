// ScanQR.tsx (for Distributor)
"use client"
import React, { useState } from "react";
import Link from "next/link";
import styles from "./../../styles/distributor/scanqr/scanqr.module.css" 
import NoQRFoundpopup from "@/app/components/NoQRFoundpopup";
import { DISinfo } from "@/app/contracts/connect";

function ScanQRPage() {
  const [showPopup, setShowPopup] = useState(false);

  const [isQuantityValid, setIsQuantityValid] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [yourArrayState, setYourArrayState] = useState([]);
  const [scannedMedicine, setScannedMedicine] = useState<null | { name: string }>({ name: '' });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageBuffer, setImageBuffer] = useState('');
  const [rawmaterial, setRawMaterial] = useState('');
  const [pop2,setpop2]= useState(false);
  const [scannedQRData, setScannedQRData] = useState<null | {  manufacturer: string; supplier:string }>({ 
    supplier:"",
    manufacturer: "", 
  });
  const handleImageInputChange = (event: any) => {
    const file = event.target.files[0];

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
      const id = responseData.id;
      try {
        let newval = id-1;
        const publicKeyValue = await DISinfo(newval);
        console.log("dhyan",publicKeyValue); // Access and use publicKeyValue here
  
        setYourArrayState(publicKeyValue || []);
        console.log(yourArrayState[1][0]);
        
        // You can also set the value in state if you're in a React component
      } catch (error) {
        console.error('Error fetching public key:', error);
      }
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

  // Function to handle scanning QR code (you can implement your scanning logic here)

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
              <Link href="/Distributor">Distributor Dashboard</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles["scan-qr-page"]}>
        <h1 className={styles.h1}>Scan QR Code</h1>
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
      {showPopup && scannedQRData !== null && (
        <div className={styles.popup}>
          <p>Supplier: {yourArrayState[1][0] !== 0 ? yourArrayState[1][0] : '0xd13CEB1f97ffC9a81c3D311Ea768DC5f0B3ADa3A'}  </p>
          <p>Manufacturer: {yourArrayState[2][0] !== 0 ? yourArrayState[2][0] : '0xC9F48c648726e8EA9d76F0B13fD4FB5DaFc31788'}  </p>
          <button className={styles["popup-close-button"]} onClick={closePopup}>
            Close
          </button>
        </div>
      )}
      {pop2 && <NoQRFoundpopup onClose={() => setpop2(false)} message="No such QR found."/>}
    </div>

  );
}

export default ScanQRPage;
