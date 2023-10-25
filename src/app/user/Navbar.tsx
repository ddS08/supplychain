"use client"
import React, { useState, useEffect } from 'react';
import styles from '../styles/user/purchaseitem/purchaseitem.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { getPublicKeyFromMetaMask } from '../backend/ethaddressreceiver';
// Make sure to pass an empty dependency array if you only want this to run once

function Navbar(){
  const [pop2,setpop2]= useState(false);
  const [pop3,setpop3]= useState(false);
  const [key,setkey] = useState('');
  useEffect(() => {
    const fetchPublicKey = async () => {
      const publickey = await getPublicKeyFromMetaMask();
      console.log("asdad",publickey);
      setkey(publickey);
      const response = await fetch('/api/checkuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({publickey}),
      });
    
      if (response.status === 500) {
        // Login was successful
        console.log('Login successful');
        setpop2(true);
      } else {
        // Login failed
        console.error('Login failed');
        setpop3(true);
      }
      // You can set the public key to the state or take any further actions here
    };
  
    fetchPublicKey();
  }, []); 

    return(<header className={styles.header}>
        <nav className={`${styles.nav} ${styles.loginNav}`}> {/* Added the loginNav class */}
          <div className={styles.logo}>
            <Link href="/">PharmaChain</Link>
          </div>
          <ul className={styles['nav-links']}>
            <li>
              <Link href="/user">Dashboard</Link>
            </li>
            {pop2 ? (
              <div>
                <li>
                  <Link href="/user/Login">Login</Link>
                </li>
                <li>
                  <Link href="/user/Register">Register</Link>
                </li>
              </div>
            ) :(<li>
              <Link href="#">{key}</Link>
            </li>)}
          </ul>
        </nav>
      </header>);
}
export default Navbar;