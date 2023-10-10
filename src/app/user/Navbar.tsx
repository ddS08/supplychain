"use client"
import React, { useState, useEffect } from 'react';
import styles from '../styles/user/purchaseitem/purchaseitem.module.css';
import Link from 'next/link';
import Image from 'next/image';

function Navbar(){
    return(<header className={styles.header}>
        <nav className={`${styles.nav} ${styles.loginNav}`}> {/* Added the loginNav class */}
          <div className={styles.logo}>
            <Link href="/">PharmaChain</Link>
          </div>
          <ul className={styles['nav-links']}>
            <li>
              <Link href="/user">Dashboard</Link>
            </li>
            <li>
              <Link href="/user/Login" >Login</Link>
            </li>
            <li>
              <Link href="/user/Register">Register</Link>
            </li>
          </ul>
        </nav>
      </header>);
}
export default Navbar;