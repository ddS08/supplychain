import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/user/user.module.css'; // Import user-specific styles
import Navbar from './Navbar';

export default function User() {
  return (<div><Navbar/>
    <div className={styles.container}>


      <main>
        <section className={styles.cards}>
          {/* User Dashboard Cards */}
          <div className={styles.card}>
            <Link href="/user/purchaseitem">Purchase Items</Link>
          </div>
          <div className={styles.card}>
            <Link href="/user/ViewCart">View Cart</Link>
          </div>
          <div className={styles.card}>
            <Link href="/user/productscanning">Order Tracking</Link>
          </div>
          <div className={styles.card}>
            <Link href="/insights">Medicine Insights</Link>
          </div>
          <div className={styles.card}>
            <Link href="/insights">Report an issue</Link>
          </div>
          <div className={styles.card}>
            <Link href="/insights">Prior purchases</Link>
          </div>
        </section>
      </main>
    </div>
    </div>
  );
}
