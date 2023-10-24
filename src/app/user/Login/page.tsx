"use client"
import React, { useState } from 'react';
import styles from '../../styles/user/Login/login.module.css';
import Link from 'next/link';
import Navbar from '../Navbar';
import NoQRFoundpopup from '@/app/components/NoQRFoundpopup';
import { useRouter } from 'next/navigation';

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
  const [pop2,setpop2]= useState(false);
  const [pop3,setpop3]= useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // Make a POST request to the login API
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      if (response.status === 200) {
        // Login was successful
        console.log('Login successful');
        setpop2(true);
      } else {
        // Login failed
        console.error('Login failed');
        setpop3(true);
      }
    
  };
  const router = useRouter();

  const onClos = () => {
    // Navigate to "/user" location
    router.push('/user');
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
    {pop2 && <NoQRFoundpopup  onClose={onClos} message="Login Successful"/>}
    {pop3 && <NoQRFoundpopup onClose={() => setpop3(false)} message="Login Failed"/>}
    </div>
  );
};

export default Login;
