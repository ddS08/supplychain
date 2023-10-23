// SellMedicine.tsx
"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./../../styles/Manufacturer/sellmedicine/sellmedicine.module.css";
import QRCode from "qrcode.react";
import NoQRFoundpopup from "@/app/components/NoQRFoundpopup";
function getTomorrow() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Add one day to today's date
    return tomorrow.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
  }
  
  function getToday() {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
  }
  
function SellMedicinePage() {
  const [imageBuffer, setImageBuffer] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [rawMaterialId, setRawMaterialId] = useState('');
  const [isQRVisible, setIsQRVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [qrImage, setQrImage] = useState('');
  const [rawmaterial, setRawMaterial] = useState('');
  const [pop2,setpop2]= useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Generate a random and unique raw material ID
    const randomId = generateRandomId();
    setRawMaterialId(randomId);
  }, []);

  const generateRandomId = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    const randomId = `${timestamp}-${randomNum}`;
    return randomId;
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
  const handleGenerateQR = (event:any) => {
    event.preventDefault();
    const newRawMaterialId = generateRandomId();
    setRawMaterialId(newRawMaterialId);
    setIsQRVisible(true);
    setIsPopupVisible(true);
  };
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
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/">PharmaChain</Link>
          </div>
          <ul className={styles['nav-links']}>
            <li>
              <Link href="/Manufacturer">Manufacturer Dashboard</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles['sell-medicine-page']}>
        <h1 className={styles.h1}>Sell Medicine</h1>
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
        <div className={styles['medicine-card']}>
          <form>
            <div className={styles['input-field']}>
              <label htmlFor="medicineName" className={styles['input-label']}>
                Medicine Name:
              </label>
              <input
                type="text"
                id="medicineName"
                className={styles['input']}
                placeholder="Enter medicine name"
              />
            </div>
            <div className={styles['input-field']}>
                <label htmlFor="manufacturingDate" className={styles['input-label']}>
                    Manufacturing Date:
                </label>
                <input
                    type="date"
                    id="manufacturingDate"
                    className={styles['input']}
                    max={getToday()} // Function to calculate the date of tomorrow
                />
                </div>

                <div className={styles['input-field']}>
                <label htmlFor="expiryDate" className={styles['input-label']}>
                    Expiry Date:
                </label>
                <input
                    type="date"
                    id="expiryDate"
                    className={styles['input']}
                    min= {getTomorrow()}// Function to calculate today's date
                />
            </div>

            <div className={styles['input-field']}>
              <label htmlFor="tabletsPerPack" className={styles['input-label']}>
                Tablets per Pack:
              </label>
              <input
                type="number"
                id="tabletsPerPack"
                className={styles['input']}
                placeholder="Enter the number of tablets per pack"
              />
            </div>
            <div className={styles['input-field']}>
              <label htmlFor="costPerPack" className={styles['input-label']}>
                Cost per Pack:
              </label>
             
              <input
                type="number"
                id="costPerPack"
                className={styles['input']}
                placeholder="Enter the cost per pack"
              />
            </div>
            <div className={styles['input-field']}>
              <label htmlFor="distributor" className={styles['input-label']}>
                Distributor:
              </label>
              <select id="distributor" className={styles['input']}>
                <option value="distributor1">Distributor 1</option>
                <option value="distributor2">Distributor 2</option>
                <option value="distributor3">Distributor 3</option>
              </select>
            </div>
            <div className={styles['input-field']}>
              <label htmlFor="medicineImage" className={styles['input-label']}>
                Medicine Image:
              </label>
              <input
                type="file"
                id="medicineImage"
                accept="image/*"
                className={styles['input-field-image']}
              />
              <div className={styles['generate-button']}>
          <button onClick={handleGenerateQR}>Generate QR Code</button>
        </div>
              {isPopupVisible && (
                <div className={styles['popup']}>
                  <div className={styles['popup-content']}>
                    <QRCode value={rawMaterialId} size={256} id='qr-code'/>
                    <p className={styles['raw-material-id']}>{rawMaterialId}</p>
                    <div className={styles['popup-buttons']}>
                    <button
                    type="button" 
                        onClick={async () => {
                            console.log("hiih");
                            const qrCodeElement = document.querySelector('#qr-code') as HTMLCanvasElement | null;

                            if (qrCodeElement) {
                                const base64String = qrCodeElement.toDataURL('image/png').split(',')[1];
                                await insertQRCode(rawMaterialId, base64String);
                                console.log(base64String);
                            } else {
                                console.error('QR Code element not found');
                            }

                            
                            }
                        }
                        >
                        Print QR Code
                        </button>


                      <button onClick={() => setIsPopupVisible(false)}>Close</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button className={styles['sell-button']}>Sell Medicine</button>
          </form>
        </div>
      )}
      {pop2 && <NoQRFoundpopup onClose={() => setpop2(false)} message="No such QR found."/>}
    </div>

  );
}

export default SellMedicinePage;
