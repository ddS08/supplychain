"use client"
import React, { useState, useEffect } from 'react';
import styles from '../../styles/user/purchaseitem/purchaseitem.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../Navbar';

interface Medicine {
  id: number;
  name: string;
  cost: number;
  tablets: number;
  manufacturingDate: string;
  expiryDate: string;
  manufacturer: string;
  image:string;
}
const handleAddToCart = (medicine: Medicine) => {
    // Implement your logic to add the selected medicine to the cart
    console.log(`Added ${medicine.name} to the cart`);
  };


const medicinesData: Medicine[] = [
  {
    id: 1,
    name: 'Medicine 1',
    cost: 10,
    tablets: 30,
    image: 'medicine1.jpg',
    manufacturingDate: '01/2023',
    expiryDate: '12/2024',
    manufacturer: 'Manufacturer A',
  },
  {
    id: 2,
    name: 'Medicine 2',
    cost: 15,
    tablets: 60,
    manufacturingDate: '03/2023',
    expiryDate: '11/2024',
    manufacturer: 'Manufacturer B',
    image: 'medicine.jpeg',
  },
  {
    id: 3,
    name: 'Medicine 3',
    cost: 15,
    tablets: 60,
    manufacturingDate: '03/2023',
    expiryDate: '11/2024',
    manufacturer: 'Manufacturer B',
    image: 'medicine1.jpg',
  },
  {
    id: 4,
    name: 'Medicine 4',
    cost: 15,
    tablets: 60,
    manufacturingDate: '03/2023',
    expiryDate: '11/2024',
    image: 'medicine.jpeg',
    manufacturer: 'Manufacturer B',
  },
];

function PurchaseItemPage() {
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with your authentication logic
  const [showFullImage, setShowFullImage] = useState(false); // State to control the full image display
  const [fullImageSrc, setFullImageSrc] = useState<string>('');

  const handleCardClick = (medicine: Medicine) => {
    setSelectedMedicine(medicine.id === selectedMedicine?.id ? null : medicine);
  };
  const handleImageClick = (medicine: Medicine) => {
    // Set the full image source and display the modal
    setFullImageSrc(`/${medicine.image}`);
    setShowFullImage(true);
  };
  const closeFullImage = () => {
    // Close the full image modal
    setShowFullImage(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectedMedicine &&
        !document.querySelector(`.${styles['medicine-card']}.selected`)?.contains(event.target as Node)
      ) {
        setSelectedMedicine(null);
      }
    };

    if (selectedMedicine) {
      // Attach the event listener when a card is selected
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      // Remove the event listener when no card is selected
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      // Cleanup the event listener on unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedMedicine]);
  return (
    <div className={styles.container}>
      <Navbar/>
      <div className={styles['purchase-item-page']}>
        <div className={styles['medicine-list']}>
          {medicinesData.map((medicine) => (
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
                  <p>Cost: ${medicine.cost.toFixed(2)}</p>
                  <p>Tablets: {medicine.tablets}</p>
                </div>

                <div
                  className={styles['medicine-image-container']}
                  onClick={() => handleImageClick(medicine)} // Handle image click
                >
                  <Image
                    src={`/${medicine.image}`}
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
                  <p>Manufacturer: {medicine.manufacturer}</p>
                  <button className={styles['add-to-cart-button']} onClick={() => handleAddToCart(medicine)}>
                    Add to Cart
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
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

    
  );
}

export default PurchaseItemPage;

