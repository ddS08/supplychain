"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './../../styles/Supplier/createrawmaterial/createrawmaterial.module.css';

function CreateRawMaterialPage() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
    const [isQuantityValid, setIsQuantityValid] = useState(true);

  const handleCreateMaterial = () => {
    // Implement your logic to create a raw material
    console.log(`Creating material: Name - ${name}, Quantity - ${quantity}`);
  };

  const handleQuantityChange = (e:any) => {
    const inputValue = e.target.value;
    const isValid = /^\d+$/.test(inputValue);
    setIsQuantityValid(isValid);
    setQuantity(inputValue);
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
      <div className={styles['supplier-page']}>
        <h1 className={styles.h1}>Create Raw Material</h1>
        <div className={styles['input-fields']}>
          <label htmlFor="name" className={styles.label}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            className={styles.input}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="quantity" className={styles.label}>
            Quantity:
          </label>
          <input
            type="text"
            id="quantity"
            value={quantity}
            className={styles.input}
            onChange={handleQuantityChange}
          />
          {!isQuantityValid && (
            <span className={styles['input-error']}>Please enter a valid quantity</span>
          )}
          <button className={styles.button} onClick={handleCreateMaterial}>
            Create Material
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateRawMaterialPage;
