"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "./../../styles/Manufacturer/buyrawmaterial/buyrawmaterial.module.css";
interface RawMaterial {
  id: number;
  name: string;
  supplier: string;
  totalQuantity: number;
  image: string; // Add this property if it's used
  selectedQuantity: number; // Add this property if it's used

}
function BuyRawMaterialPage() {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  useEffect(() => {
    async function fetchRawMaterials() {
      try {
        const response = await fetch('/api/product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data.rawMaterials)  
          setRawMaterials(data.rawMaterials);
        } else {
          // Handle the case where the request was not successful
          console.error('Failed to fetch product information');
        }
      } catch (error) {
        console.error('Error fetching raw materials:', error);
      }
    }

    fetchRawMaterials();
  }, []);
  const increaseQuantity = (id: number) => {
    const updatedRawMaterials = rawMaterials.map((rawMaterial) =>
      rawMaterial.id === id
        ? { ...rawMaterial, selectedQuantity: rawMaterial.selectedQuantity + 1 }
        : rawMaterial
    );
    setRawMaterials(updatedRawMaterials);
  };
  
  const decreaseQuantity = (id: number) => {
    const updatedRawMaterials = rawMaterials.map((rawMaterial) =>
      rawMaterial.id === id && rawMaterial.selectedQuantity > 0
        ? { ...rawMaterial, selectedQuantity: rawMaterial.selectedQuantity - 1 }
        : rawMaterial
    );
    setRawMaterials(updatedRawMaterials);
  };
  // Function to add to cart
const addToCart = async (id:any, selectedQuantity:any) => {
  try {
    const response = await fetch('/api/buy-raw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, totalQuantity: selectedQuantity }),
    });

    if (response.ok) {
      // Handle success (e.g., display a success message)
      console.log('Added to cart successfully');
    } else {
      // Handle failure (e.g., display an error message)
      console.error('Failed to add to cart');
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
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
      <div className={styles['buy-raw-material-page']}>
        <h1 className={styles.h1}>Buy Raw Materials</h1>
        <div className={styles['raw-material-list']}>
          {rawMaterials.map((rawMaterial) => (
            <div key={rawMaterial.id} className={styles['raw-material-card']}>
              <div className={styles['raw-material-image-container']}>
                <div className={`row ${styles['raw-image-main-info']}`}>
                  <img
                    src={`/rawmaterial1.jpg`}
                    alt={rawMaterial.name}
                    className={`col ${styles['raw-material-image']}`}
                  />
                </div>
                <div className={`col ${styles['raw-material-details']}`}>
                  <h2>Name: {rawMaterial.name}</h2>
                  <p className={styles['supplier-name']}>
                    Supplier: {rawMaterial.supplier}
                  </p>
                </div>
              </div>
              <div className={styles['additional-details']}>
                <p>Total Quantity: {rawMaterial.totalQuantity} units</p>
              </div>
              <div className={styles['quantity-controls']}>
                <button
                  className={styles['quantity-button']}
                  onClick={() => decreaseQuantity(rawMaterial.id)}
                >
                  -
                </button>
                <span>{rawMaterial.selectedQuantity}</span>
                <button
                  className={styles['quantity-button']}
                  onClick={() => increaseQuantity(rawMaterial.id)}
                >
                  +
                </button>
              </div>
              {rawMaterial.selectedQuantity > 0 && (
                <button className={styles['add-to-cart-button']}
                onClick={() => addToCart(rawMaterial.id, rawMaterial.totalQuantity-rawMaterial.selectedQuantity)}>
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BuyRawMaterialPage;
