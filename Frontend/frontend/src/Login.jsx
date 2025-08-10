import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('All fields are required.');
      return;
    }

    // Retrieve users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find a user that matches the email and password
    const user = users.find(
      u => u.email === form.email && u.password === form.password
    );

    if (user) {
      // On successful login, you could store the logged-in user's info
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      // Redirect to the main page
      navigate('/');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <div className="title-bar">
          <h1>Log In</h1>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <p className="error-message">{error}</p>}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email address"
            value={form.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Your password"
            value={form.password}
            onChange={handleChange}
          />
          <button type="submit">Log In</button>
          <p className="switch-auth">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
      {/* Styles are identical to Signup.jsx, so they can be reused or moved to a global CSS file */}
      <style>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: black;
          color: white;
          padding: 20px;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        .auth-form-wrapper {
          width: 100%;
          max-width: 400px;
        }
        .title-bar {
          background: linear-gradient(90deg, blue, purple, pink);
          padding: 20px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .title-bar h1 {
          margin: 0;
          font-size: 2.5rem;
        }
        .auth-form {
          background-color: #1e1e1e;
          padding: 30px;
          border-radius: 0 0 10px 10px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .auth-form label {
          font-weight: bold;
          font-size: 0.9rem;
          margin-bottom: -5px;
        }
        .auth-form input {
          width: 100%;
          padding: 12px;
          border-radius: 5px;
          border: 1px solid #444;
          background-color: #333;
          color: white;
          font-size: 1rem;
          box-sizing: border-box;
        }
        .auth-form button {
          padding: 12px 20px;
          background: linear-gradient(90deg, blue, purple);
          color: white;
          font-weight: bold;
          font-size: 1rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
        }
        .error-message {
          color: #ff4d4d;
          background-color: rgba(255, 77, 77, 0.1);
          border: 1px solid #ff4d4d;
          padding: 10px;
          border-radius: 5px;
          text-align: center;
        }
        .switch-auth {
          text-align: center;
          margin-top: 15px;
        }
        .switch-auth a {
          color: #a855f7;
          font-weight: bold;
          text-decoration: none;
        }
          /* In src/index.css */

html,
body,
#root {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #000000; /* Sets the default background to black */
  font-family: system-ui, sans-serif;
}
      `}</style>
    </div>
  );
}
