"use client"
// Import necessary modules and libraries
import React, { useState } from 'react';
import styles from '../../styles/user/Register/Register.module.css';
import Link from 'next/link';
import Navbar from '../Navbar';
import NoQRFoundpopup from '@/app/components/NoQRFoundpopup';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
  // Initialize state for form data and error messages
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    ethereumAddress: '',
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    ethereumAddress: '',
  });
  const [pop2,setpop2]= useState(false);
  const [pop3,setpop3]= useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the corresponding error message when the user starts typing
    setFormErrors({
      ...formErrors,
      [name]: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your registration logic here
    console.log('Form submitted with data:', formData);
    

    // Example: Validate the form fields (you can add more complex validation)
    const newErrors = {} as any;
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.ethereumAddress) {
      newErrors.ethereumAddress = 'Ethereum Address is required';
    }

    // If there are errors, update the state with error messages
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
    } else {
      // No errors, proceed with registration
      // Add your registration logic here
    }
    const response = await fetch('/api/registeruser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    console.log("erso",response.status);

    if (response.status === 200) {
      // Registration was successful
      console.log('Registration successful:');
      setpop2(true);
      // You can perform additional actions, e.g., redirect to a success page.
    } else {
      // Registration failed
      console.error('Registration failed:');
      setpop3(true);
      // Handle the registration failure, e.g., display an error message.
    }
  }

  const router = useRouter();

  const onClos = () => {
    // Navigate to "/user" location
    router.push('/user');
  };

  return (
    <div><Navbar/>
    <div className={styles.container}>
      
      <div className={styles.card}>
        <h2>Register</h2>
        <hr className="mt-1 mb-2" />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className="ms-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className={`${styles.input} mt-1`}
            />
            <div className={styles.error}>{formErrors.username}</div>
          </div>
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
            <div className={styles.error}>{formErrors.email}</div>
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
            <div className={styles.error}>{formErrors.password}</div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className="ms-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={`${styles.input} mt-1`}
            />
            <div className={styles.error}>{formErrors.confirmPassword}</div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="ethereumAddress" className="ms-1">
              Ethereum Address
            </label>
            <input
              type="text"
              id="ethereumAddress"
              name="ethereumAddress"
              value={formData.ethereumAddress}
              onChange={handleChange}
              required
              className={`${styles.input} mt-1`}
            />
            <div className={styles.error}>{formErrors.ethereumAddress}</div>
          </div>
          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </form>
      </div>
    </div>
    {pop2 && <NoQRFoundpopup onClose={onClos} message="User Registered Successfully"/>}
    {pop3 && <NoQRFoundpopup onClose={() => setpop3(false)} message="Registration failed, try using different username/email/ethereumaddress"/>}
    </div>
  );
};

export default Register;



