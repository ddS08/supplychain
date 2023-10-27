// GenerateQR.tsx
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode.react';
import styles from './../../styles/Supplier/GenerateQR/GenerateQR.module.css';
import { qrblock } from '@/app/contracts/connect';

function GenerateQR() {
  const [rawMaterialId, setRawMaterialId] = useState('');
  const [isQRVisible, setIsQRVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [qrImage, setQrImage] = useState('');

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

  const handleGenerateQR = () => {
    const newRawMaterialId = generateRandomId();
    setRawMaterialId(newRawMaterialId);
    setIsQRVisible(true);
    setIsPopupVisible(true);
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
        await qrblock();
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
              <Link href="/Supplier">Supplier Dashboard</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles['qr-generator']}>
        <h1 className={styles.h1}>QR Code Generator</h1>
        <div className={styles['generate-button']}>
          <button onClick={handleGenerateQR}>Generate QR Code</button>
        </div>
        
      </div>

      {isPopupVisible && (
        <div className={styles['popup']}>
          <div className={styles['popup-content']}>
            <QRCode value={rawMaterialId} size={256} id='qr-code'/>
            <p className={styles['raw-material-id']}>{rawMaterialId}</p>
            <div className={styles['popup-buttons']}>
            <button
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
  );
}

export default GenerateQR;
