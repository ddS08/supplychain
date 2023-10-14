// BuyRawMaterial.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./../../styles/Manufacturer/buyrawmaterial/buyrawmaterial.module.css";

function BuyRawMaterialPage() {
  const [rawMaterials, setRawMaterials] = useState([
    {
      id: 1,
      name: 'Raw Material 1',
      image: 'rawmaterial1.jpg',
      supplier: 'Supplier A',
      totalQuantity: 50, // Total quantity possessed by supplier
      selectedQuantity: 0, // Quantity selected by the manufacturer
      pricePerUnit: 5.0,
    },
    {
      id: 2,
      name: 'Raw Material 2',
      image: 'rawmaterial1.jpg',
      supplier: 'Supplier B',
      totalQuantity: 30,
      selectedQuantity: 0,
      pricePerUnit: 4.0,
    },
    {
      id: 3,
      name: 'Raw Material 3',
      image: 'rawmaterial1.jpg',
      supplier: 'Supplier C',
      totalQuantity: 75,
      selectedQuantity: 0,
      pricePerUnit: 6.0,
    },
    // Add more raw materials as needed
  ]);

  const increaseQuantity = (id: number) => {
    const updatedRawMaterials = rawMaterials.map((rawMaterial) =>
      rawMaterial.id === id && rawMaterial.selectedQuantity < rawMaterial.totalQuantity
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
                  src={`/${rawMaterial.image}`}
                  alt={rawMaterial.name}
                  className={`col ${styles['raw-material-image']}`}
                />
              </div>
              <div className={`col ${styles['raw-material-details']}`}>
                <h2>{rawMaterial.name}</h2>
                <p className={styles['supplier-name']}>
                  Supplier: {rawMaterial.supplier}
                </p>
              </div>
              </div>
              <div className={styles['additional-details']}>
                <p>Total Quantity: {rawMaterial.totalQuantity} units</p>
                <p>Price per Unit: ${rawMaterial.pricePerUnit.toFixed(2)}</p>
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
              <p className={styles['relative-price']}>
                Relative Price: ${(
                  rawMaterial.selectedQuantity * rawMaterial.pricePerUnit
                ).toFixed(2)}
              </p>
              {rawMaterial.selectedQuantity > 0 && (
                <button className={styles['add-to-cart-button']}>
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
