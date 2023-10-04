// ViewCartPage.js
"use client"
import React from 'react';
import styles from '../../styles/user/ViewCart/ViewCart.module.css';
import Link from 'next/link';
import { FaRegUserCircle } from "react-icons/fa";
import Image from 'next/image'; // Import the Image component

function ViewCartPage() {
  // Sample data for medicines in the cart
  const cartMedicines = [
    {
      name: 'Medicine 1',
      price: 10.0,
      quantity: 3,
      dateOfBuying: '09/13/2023',
      orderStatus: 'Enroute',
      image: 'medicine1.jpg', // Add an image URL for each medicine
    },
    {
      name: 'Medicine 2',
      price: 15.0,
      quantity: 10,
      dateOfBuying: '09/13/2023',
      orderStatus: 'Not ordered',
      image: 'medicine.jpeg', // Add an image URL for each medicine
    },
    // Add more medicines as needed
  ];

  const handleTrackOrder = (orderStatus:any) => {
    if (orderStatus === 'Enroute') {
      // Implement your logic to track the order
      console.log('Tracking the order...');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={`${styles.nav} ${styles.viewCartNav}`}>
          <div className={styles.logo}>
            <Link href="/">PharmaChain</Link>
          </div>
          <ul className={styles['nav-links']}>
            <li>
              <Link href="/user">Dashboard</Link>
            </li>
            <li>
              <Link href="/user/"><div className={styles['user-container']}>
                  <FaRegUserCircle />
                  <span>User</span>
                </div></Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles['view-cart-page']}>
        <h1>View Cart</h1>
        <table className={styles['cart-table']}>
          <thead>
            <tr>
              <th>Image</th> {/* Add the image column */}
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Date of Buying</th>
              <th>Order Status</th>
              <th>Track Order</th>
            </tr>
          </thead>
          <tbody>
            {cartMedicines.map((medicine, index) => (
              <tr key={index}>
                <td>
                  <div className={styles['medicine-image-container']}>
                    <Image
                      src={`/${medicine.image}`}
                      alt={medicine.name}
                      width={80}
                      height={80}
                      className={styles['medicine-image']}
                    />
                  </div>
                </td>
                <td>{medicine.name}</td>
                <td>${medicine.price.toFixed(2)}</td>
                <td>{medicine.quantity}</td>
                <td>{medicine.dateOfBuying}</td>
                <td>{medicine.orderStatus}</td>
                <td>
                  {medicine.orderStatus === 'Enroute' && (
                    <button
                      className={styles['track-order-button']}
                      onClick={() => handleTrackOrder(medicine.orderStatus)}
                    >
                      Track Order
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewCartPage;
