// SellToRetailer.tsx
"use client"
import React, { useState } from "react";
import Link from "next/link";
import styles from "./../../styles/distributor/selltoretailer/selltoretailer.module.css";
import NoQRFoundpopup from "@/app/components/NoQRFoundpopup";
interface Distributor {
  key: string; // Add this property to define the type
  Name: string;
  // Add other properties if they exist in your data
}
function SellToRetailerPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [imageBuffer, setImageBuffer] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [rawMaterialId, setRawMaterialId] = useState('');
  const [isQRVisible, setIsQRVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [qrImage, setQrImage] = useState('');
  const [rawmaterial, setRawMaterial] = useState('');
  const [pop2,setpop2]= useState(false);
  const [pop3,setpop3]= useState(false);
  const [distributors, setDistributors] = useState<Distributor[]>([]);
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
      getDistributorinfo();
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
  const getDistributorinfo = async() =>{
    try {
    const role = 'Retailer';

    const response = await fetch('/api/getretdis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify({role}),
    });

    if (response.status === 200) {
      // Request was successful, you can handle success here
      const responseData = await response.json();
      console.log('QR Code found successfully:', responseData);
      const rows = responseData.rows;
      setDistributors(rows);
      console.log('Rows:', rows);
      // Access the materialId from the response

    } else {
      // Handle any errors here
      console.error('Error inserting QR Code.');
      setpop3(true);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
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

const insertQRCode = async (rawMaterialId: string, qrImage: string) => {
  try {
      console.log("Qr:",qrImage);
      console.log("rawmaterial",rawMaterialId);
    const response = await fetch('/api/insert-qr-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rawMaterialId, qrImage }),
    });

    if (response.status === 200) {
      // Request was successful, you can handle success here
      console.log('QR Code inserted successfully.');
    } else {
      // Handle any errors here
      console.error('Error inserting QR Code.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
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
              <Link href="/Distributor">Distributor Dashboard</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles["sell-to-retailer-page"]}>
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
            <div className={styles["retailer-dropdown"]}>
              <label htmlFor="retailer">Select Retailer:</label>
              <select id="distributor" className={styles['input']}>
                  {distributors.map((distributor, index) => (
                    <option key={distributor.key} value={distributor.Name}>
                      {distributor.Name}
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
        {pop2 && <NoQRFoundpopup onClose={() => setpop2(false)} message="No such QR found."/>}
      {pop3 && <NoQRFoundpopup onClose={() => setpop3(false)} message="No Retailers found."/>}
    </div>
  );
}

export default SellToRetailerPage;
