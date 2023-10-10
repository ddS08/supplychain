"use client"
import React, { useState } from 'react';
import styles from '../../styles/user/Login/login.module.css';
import Link from 'next/link';
import Navbar from '../Navbar';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Form submitted with data:', formData);
  };

  return (
    <div><Navbar/>
    <div className={styles.container}>
      
      <div className={styles.card}>
        <h2>Login</h2>
        <hr className="mt-1 mb-2" />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className="ms-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`${styles.input} mt-1`}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className="ms-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`${styles.input} mt-1`}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
