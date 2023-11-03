// SellMedicine.tsx
"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./../../styles/Manufacturer/sellmedicine/sellmedicine.module.css";
import QRCode from "qrcode.react";
import NoQRFoundpopup from "@/app/components/NoQRFoundpopup";
import DistributorPage from "@/app/Distributor/page";
import { medblock } from "@/app/contracts/connect";
import { getPublicKeyFromMetaMask } from "@/app/backend/ethaddressreceiver";
function getTomorrow() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Add one day to today's date
    return tomorrow.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
  }
  interface Distributor {
    key: string; // Add this property to define the type
    Name: string;
    // Add other properties if they exist in your data
  }
  interface ProductData {
    name: string;
    supplier_name: string;
    image: string;
    id:number;
    supplier_eth_address:string;
    quantity:string;
    // Add any other properties you expect in the 'productData' object
  }
  function getToday() {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
  }
  
function SellMedicinePage() {
  const [publickey,setpublickey] = useState('');
  const [imageBuffer, setImageBuffer] = useState('');
  const [productData, setProductData] = useState<ProductData | null>(null); // Initialize productData state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [rawMaterialId, setRawMaterialId] = useState('');
  const [isQRVisible, setIsQRVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedDistributorKey, setSelectedDistributorKey] = useState('');
  const [qrImage, setQrImage] = useState('');
  const [rawmaterial, setRawMaterial] = useState('');
  const [pop2,setpop2]= useState(false);
  const [pop3,setpop3]= useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [idval,setidval] = useState('');
  const [publicKeyval,setpublicKeyval] = useState('');
  const [imageBuffer1, setImageBuffer1] = useState('');

  const [selectedImage1, setSelectedImage1] = useState<string | null>(null);

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
      const id=responseData.id;
      console.log('Material ID:', materialId);
      console.log("id",id);
      setidval(id);
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
    
          // Handle the product data as needed
          // You can access the product data using data.productData
        } else {
          // Handle the case where the request was not successful
          console.error('Failed to retrieve product data');
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
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
    const role = 'Distributor';

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
      setSelectedDistributorKey(rows[0].Key);
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
    
  const handleGenerateQR = (event:any) => {
    event.preventDefault();
    const newRawMaterialId = generateRandomId();
    setRawMaterialId(newRawMaterialId);
    setIsQRVisible(true);
    setIsPopupVisible(true);
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
  const handleImageInputChange1 = (event: any) => {
    const file = event.target.files[0];
    const files = event.target.files && event.target.files[0];
    if (files) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage1(imageUrl);
    }


    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          let base64String = e.target.result as string;
          if (base64String.startsWith('data:image/jpeg;base64,')) {
            base64String = base64String.slice('data:image/jpeg;base64,'.length);
          }
          setImageBuffer1(base64String);
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
const handlesellbutton = async () => {
  let publicKeyValue = '';
  try {
    publicKeyValue = await getPublicKeyFromMetaMask();
    console.log("dhyan",publicKeyValue); // Access and use publicKeyValue here

    // You can also set the value in state if you're in a React component
    setpublicKeyval(publicKeyValue);
  } catch (error) {
    console.error('Error fetching public key:', error);
  }


  const medicineNameInput = document.getElementById('medicineName') as HTMLInputElement;
  const manufacturingDateInput = document.getElementById('manufacturingDate') as HTMLInputElement;
  const expiryDateInput = document.getElementById('expiryDate') as HTMLInputElement;
  const tabletsPerPackInput = document.getElementById('tabletsPerPack') as HTMLInputElement;
  const costPerPackInput = document.getElementById('costPerPack') as HTMLInputElement;
  const distributorSelect = document.getElementById('distributor') as HTMLSelectElement;
  const medicineName = medicineNameInput.value;
  const manufacturingDate = manufacturingDateInput.value;
  const expiryDate = expiryDateInput.value;
  const tabletsPerPack = tabletsPerPackInput.value;
  const costPerPack = costPerPackInput.value;
  const selectedDistributor = distributorSelect.value;
  console.log("sele",selectedDistributor);
  let selecteddistkey = '';
  try {
    const response = await fetch('/api/getkey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedDistributor }), // Send the id in the request body
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Product data:', data.rows);
      selecteddistkey = data.rows[0].key;
      console.log("Asdasd",selecteddistkey);

      // Handle the product data as needed
      // You can access the product data using data.productData
    } else {
      // Handle the case where the request was not successful
      console.error('Failed to retrieve product data');
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
  }

  // Now you have all the values
  console.log("supp,",productData?.supplier_eth_address);
  console.log('Medicine Name:', medicineName);
  console.log('Manufacturing Date:', manufacturingDate);
  console.log('Expiry Date:', expiryDate);
  console.log('Tablets Per Pack:', tabletsPerPack);
  console.log('Cost Per Pack:', costPerPack);
  console.log('Selected Distributor:', selectedDistributor);
  console.log("pb",publicKeyValue);
  console.log('idval,',idval);
  const numberid = parseInt(idval, 10);
  // Convert the manufacturingDate string to a Date object
const date = new Date(manufacturingDate);
const productData1 = {
  manufacturingDate: manufacturingDate,
  expiryDate: expiryDate,
  image: imageBuffer1, // Replace with actual binary image data
  cost: costPerPack,
  quantityCart: tabletsPerPack,
  name: medicineName,
};

try {
  const response = await fetch('/api/add-man-mat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData1),
  });

  if (response.ok) {
    // Handle a successful response here, e.g., display a success message.
  } else {
    // Handle an error response here, e.g., display an error message.
  }
} catch (error) {
  console.error('An error occurred:', error);
  // Handle the error, e.g., display an error message to the user.
}

// Get the timestamp in seconds (as a uint256 value)
const timestamp = Math.floor(date.getTime() / 1000);
const date2 = new Date(expiryDate);

// Get the timestamp in seconds (as a uint256 value)
const timestamp2 = Math.floor(date2.getTime() / 1000);
console.log(selecteddistkey);
const val = medblock(medicineName,tabletsPerPack,costPerPack,timestamp,timestamp2,productData?.supplier_eth_address,numberid,selecteddistkey,publicKeyValue);
console.log("vas",val);

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
      {(!showPopup && 
      <div>
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
      )}
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
              <select id="distributor" className={styles['input']}
              onChange={(e) => setSelectedDistributorKey(e.target.value)}>
                  {distributors.map((distributor, index) => (
                    <option key={distributor.key} value={distributor.key}>
                      {distributor.Name}
                    </option>
                  ))}
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
                onChange={handleImageInputChange1}
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
            <button type="button" className={styles['sell-button']} onClick={handlesellbutton}>Sell Medicine</button>

          </form>
        </div>
      )}
      {pop2 && <NoQRFoundpopup onClose={() => setpop2(false)} message="No such QR found."/>}
      {pop3 && <NoQRFoundpopup onClose={() => setpop3(false)} message="No distributors found."/>}
    </div>

  );
}

export default SellMedicinePage;
