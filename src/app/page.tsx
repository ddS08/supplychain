"use client"
import Head from 'next/head';
import Link from 'next/link';
import styles from './styles/home.module.css';
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {

  const [flippedCard, setFlippedCard] = useState(null);

  const handleCardClick = (index : any) => {
    setFlippedCard(flippedCard === index ? null : index);
  };
  const cardData = [
    {
      title: 'Efficient Supply Chain Management',
      description: 'Streamline your pharmaceutical supply chain for maximum efficiency.',
    },
    {
      title: 'Improved Transparency',
      description: 'Enhance transparency in the pharmaceutical distribution process.',
    },
    {
      title: 'Patient Safety',
      description: 'Prioritize patient safety with our secure and traceable supply chain solution.',
    },
    // Add more card data here
  ];
  return (
    <div className={styles.container}>
      <Head>
        <title>PharmaChain DApp</title>
        <meta name="description" content="Pharmaceutical Supply Chain DApp" />
      </Head>

      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/">PharmaChain</Link>
          </div>
          <ul className={styles['nav-links']}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/Admin">Admin</Link>
            </li>
            <li>
              <Link href="/Manufacturer">Manufacturer</Link>
            </li>
            <li>
              <Link href="/dashboard/retailer">Retailer</Link>
            </li>
            <li>
              <Link href="/dashboard/distributor">Distributor</Link>
            </li>
            <li>
              <Link href="/dashboard/transporter">Transporter</Link>
            </li>
            <li>
              <Link href="/Supplier">Supplier</Link>
            </li>
            <li>
              <Link href="/user">User</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <h1>Welcome to PharmaChain DApp</h1>
          <p>Revolutionizing Pharmaceutical Supply Chains</p>
          <button className={styles['cta-button']}>Get Started</button>
        </section>

        <section className={styles.features}>
        <h2 className={styles.featuresh2}>Why Choose PharmaChain DApp?</h2>
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`${styles['feature-card']} ${
                flippedCard === index ? styles.flipped : ''
              }`}
              onClick={() => handleCardClick(index)}
            >
              <div className={styles['card-content']}>
                <div className={styles['card-header']}>

                  <button className={styles['card-button']}>
                    {flippedCard !== index ? ( // Show header only if not flipped
                    <div className={styles['card-header']}>
                      <h3 className={styles['card-title']}>{card.title}</h3>
                    </div>
                  ) : null}
                  {flippedCard === index ? (
                    <p className={styles['card-description']}>{card.description}</p>
                  ) : null}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}