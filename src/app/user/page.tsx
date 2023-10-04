import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/user/user.module.css'; // Import user-specific styles

export default function User() {
  return (
    <div className={styles.container}>
      <Head>
        <title>User Dashboard</title>
        <meta name="description" content="User Dashboard" />
      </Head>

      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/">PharmaChain</Link>
          </div>
          <ul className={styles['nav-links']}>
            <li>
              <Link href="/user">Dashboard</Link>
            </li>
            <li>
              <Link href="/user/Login">Login</Link>
            </li>
            <li>
              <Link href="/user/Register">Register</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className={styles.cards}>
          {/* User Dashboard Cards */}
          <div className={styles.card}>
            <Link href="/track-order">Order Tracking</Link>
          </div>
          <div className={styles.card}>
            <Link href="/user/purchaseitem">Purchase Items</Link>
          </div>
          <div className={styles.card}>
            <Link href="/user/ViewCart">View Cart</Link>
          </div>
          <div className={styles.card}>
            <Link href="/user/productscanning">Product Scanning</Link>
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
  );
}
