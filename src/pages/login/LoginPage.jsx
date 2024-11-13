import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import styles from "./login.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null); // reCAPTCHA token state

  const navigate = useNavigate();

  const onChange = (token) => {
    setCaptchaToken(token); // Capture the token from reCAPTCHA
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // För att ta emot HttpOnly-cookien från backend
        body: JSON.stringify({ email, password, recaptchaToken: captchaToken }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!");
        navigate("/workspace"); // Omdirigera till workspace
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (error) {
      setMessage("An error occurred during login");
    }
  };

  return (
    <div className={styles.loginpage}>
      <h2>LOGIN</h2>
      <div className={styles.logincomponent}>
        <form className={styles.form} onSubmit={handleLogin}>
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
          <button className={styles.loginbutton} type="submit">
            Login
          </button>
          <div style={{ marginTop: "10px" }}>
            <ReCAPTCHA
              sitekey="6LfRVngqAAAAAMk_kGrqL-7v53mBr8yff8EVJvsD" // Use your actual site key here
              onChange={onChange}
            />
          </div>
          <Link className={styles.link} to="/register">
            Don't have an account? REGISTER HERE!
          </Link>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
