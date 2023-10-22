  "use client";
  import React, { useEffect, useState } from 'react';
  import Link from 'next/link';
  import Web3 from 'web3';
  import styles from './styles/home.module.css';
  import Head from 'next/head';
import { getPublicKeyFromMetaMask } from './backend/ethaddressreceiver';


  export default function Home() {
    const [flippedCard, setFlippedCard] = useState(null);
    const [web3, setWeb3] = useState<Web3 | null>(null);

    const handleCardClick = (index: any) => {
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

    const connectMetaMask = async () => {
      if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        try {
          // Request MetaMask connection
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Use MetaMask provider
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
        
      }

    };
    
    return (
      <div className={styles.container}>
        <Head>
          <title>PharmaChain DApp</title>
          <meta name="description" content="Pharmaceutical Supply Chain DApp" />
        </Head>
        
        {web3 ? (
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
                  <Link href="/Supplier">Supplier</Link>
                </li>
                <li>
                  <Link href="/Manufacturer">Manufacturer</Link>
                </li>
                <li>
                  <Link href="/Distributor">Distributor</Link>
                </li>
                <li>
                  <Link href="/Retailer">Retailer</Link>
                </li>
                <li>
                  <Link href="/user">User</Link>
                </li>
              </ul>
            </nav>
          </header>
        ) : null}

        <main>
          {web3 ? (
            <div>
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
                          {flippedCard !== index ? (
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
            </div>
          ) : (
            <section className={styles.features}>
              <h2 className={styles.featuresh2}>Connect with MetaMask</h2>
              <p>Connect with MetaMask to access advanced features.</p>
              <button className={styles['cta-button']} onClick={connectMetaMask}>
                Connect MetaMask
              </button>
            </section>
          )}
        </main>
      </div>
    );
  }
