import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './../login/login.module.css';

const RegisterPage = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const requestBody = {
      fullname,
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registration successful!');
        navigate('/');
      } else {
        setMessage(data.error || 'Registration failed');
      }
    } catch (error) {
      setMessage('An error occurred during registration');
    }
  };

  return (
    <div className={styles.loginpage}>
      <h2>REGISTER</h2>
      <div className={styles.logincomponent}>
      <form className={styles.form} onSubmit={handleRegister}>
      <div className={styles.lablesinput}>
          <label>Full Name</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>
        <div className={styles.lablesinput}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.lablesinput}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
     
       
        <button className={styles.loginbutton} type="submit">Register</button>
        <Link className={styles.link} to="/">Already have an account? LOGIN HERE!</Link>
        
      </form>
      {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
