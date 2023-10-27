// ScanRawMaterial.tsx
"use client"
import React, { useState } from "react";
import Link from "next/link";
import styles from "./../../styles/Manufacturer/scanrawmaterial/scanrawmaterial.module.css";
import NoQRFoundpopup from "@/app/components/NoQRFoundpopup";
interface ProductData {
  name: string;
  supplier_name: string;
  image: string;
  id:number;
  supplier_eth_address:string;
  quantity:string;
  // Add any other properties you expect in the 'productData' object
}


function ScanRawMaterialPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [productData, setProductData] = useState<ProductData | null>(null); // Initialize productData state
  const [isQuantityValid, setIsQuantityValid] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [scannedMedicine, setScannedMedicine] = useState<null | { name: string }>({ name: '' });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageBuffer, setImageBuffer] = useState('');
  const [rawmaterial, setRawMaterial] = useState('');
  const [pop2,setpop2]= useState(false);
  const [scannedRawMaterial, setScannedRawMaterial] = useState<null | { image: string; supplier: string; }>({ image: "", supplier: "" });
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
      setShowPopup(true);
      console.log('QR Code found successfully:', responseData);

      // Access the materialId from the response
      const materialId = responseData.materialId;
      const id = responseData.id;
      console.log('Material ID:',id, materialId);
      try {
        const response = await fetch('/api/manscan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }), // Send the id in the request body
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log('Product data:', data.productData);
          setProductData(data.productData);
          console.log(productData);
    
          // Handle the product data as needed
          // You can access the product data using data.productData
        } else {
          // Handle the case where the request was not successful
          console.error('Failed to retrieve product data');
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    
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
    {showPopup && productData &&(
  <div className={styles.popup}>
    <img
      src={`/rawmaterial1.jpg`} // Use the correct property for the image
      alt={productData.name}
      className={styles['rawmaterial-image']}
    />
    <p>Name: {productData.name}</p>
    <p>Supplier: {productData.supplier_name}</p>
    <button className={styles["popup-close-button"]} onClick={closePopup}>
      Close
    </button>
  </div>
)}
 {pop2 && <NoQRFoundpopup onClose={() => setpop2(false)} message="No such QR found."/>}
    </div>
  );
}

export default ScanRawMaterialPage;
