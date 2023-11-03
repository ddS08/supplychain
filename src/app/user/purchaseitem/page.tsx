"use client"
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import styles from './../../styles/user/purchaseitem/purchaseitem.module.css'
import Image from 'next/image';
interface Medicine {
  id: number;
  name: string;
  cost: number;
  tablets?: number; // Make it optional by adding "?"
  manufacturingDate: string;
  expiryDate: string;
  manufacturer: string;
  image: string;
}

const handleAddToCart = async (medicine: Medicine) => {
  // Implement your logic to add the selected medicine to the cart
  try {
    const response = await fetch('/api/addToCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name:medicine.name }),
    });

    if (response.status === 200) {
      console.log(`Added ${medicine.name} to the cart`);
      // Update your UI or state to reflect that the medicine is added to the cart
    } else {
      console.error('Failed to add to cart');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function MedicineList() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/get-man-mat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Include the request payload here if needed
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.medicinesData) {
            setMedicines(data.medicinesData);
          }
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [showFullImage, setShowFullImage] = useState(false);
  const [fullImageSrc, setFullImageSrc] = useState<string>('');

  const handleCardClick = (medicine: Medicine) => {
    setSelectedMedicine(medicine.id === selectedMedicine?.id ? null : medicine);
  };

  const handleImageClick = (medicine: Medicine) => {
    // Set the full image source and display the modal
    setFullImageSrc('/medicine1.jpg');
    setShowFullImage(true);
  };

  const closeFullImage = () => {
    // Close the full image modal
    setShowFullImage(false);
  };
  const convertBufferToBase64 = (buffer: Buffer) => {
    return `data:image/jpeg;base64,${buffer.toString('base64')}`;
  };

  return (<div>
    <Navbar/>
    <div className={styles['purchase-item-page']}>
      
      <div className={styles['medicine-list']}>
        {medicines.map((medicine) => (
          <div
            key={medicine.id}
            className={`${styles['medicine-card']} ${
              selectedMedicine?.id === medicine.id ? styles['selected'] : ''
            }`}
            onClick={() => handleCardClick(medicine)}
          >
            <div className={styles['medicine-info']}>
              <div className={styles['medicine-details-left']}>
                <h3>{medicine.name}</h3>
                <p className={styles.medicineCost}>Cost: ₹{medicine.cost}</p>
              </div>

              <div className={styles['medicine-image-container']} onClick={() => handleImageClick(medicine)}>
                <Image
                  src='/medicine1.jpg'
                  alt={medicine.name}
                  width={100}
                  height={100}
                  className={styles['medicine-image']}
                />
              </div>
            </div>
            {selectedMedicine?.id === medicine.id && (
              <div className={styles['medicine-details']}>
                <p>Manufacturing Date: {medicine.manufacturingDate}</p>
                <p>Expiry Date: {medicine.expiryDate}</p>
                <button className={styles['add-to-cart-button']} onClick={() => handleAddToCart(medicine)}>
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {showFullImage && (
        <div className={styles['full-image-overlay']} onClick={closeFullImage}>
          <div className={styles['full-image-container']}>
            <Image
              src={fullImageSrc}
              alt="Full Medicine Image"
              width={400} // Adjust the width as needed
              height={400} // Adjust the height as needed
            />
          </div>
        </div>
      )}
    </div>
    </div>
  );
}


export default MedicineList;
