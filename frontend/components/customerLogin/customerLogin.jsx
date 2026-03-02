import React, { useState } from 'react';
import axios from 'axios';
import './customerLogin.css';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import { API } from '../../src/api/axios';

const LoginPopup = ({ toggleForm, onLoginSuccess }) => {
  const [loginEmail, setLoginEmail] = useState('');
  // const navigate = useNavigate();
  const [loginPassword, setLoginPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
    terms: '',
    general: '',
  });

  const handleLogin = async () => {
    const errors = { email: '', password: '', terms: '', general: '' };
    let isValid = true;

    // Email validation
    if (!loginEmail.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }
    //password validation
    if (!loginPassword.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    }

    if (!acceptTerms) {
      errors.terms = 'You must accept the terms and conditions';
      isValid = false;
    }

    setErrorMessages(errors);
    if (!isValid) return;

    try {
      const response = await API.post(
        '/user/loginUser',
        { email: loginEmail, password: loginPassword },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log('Login successful:', response.data);

        const token = response.data.data.UseraccessToken;
        // console.log("loginpopup", token)
        Cookies.set('UseraccessToken', token, { expires: 7, path: '/', sameSite: 'Lax', secure: false });
        // console.log('Token stored in cookie loginpopup:', Cookies.get('accessToken'));

        onLoginSuccess?.(token); //my change

        toggleForm();
      }
    } catch (error) {
      setErrorMessages((prev) => ({
        ...prev,
        general: error.response?.data?.message || 'Invalid credentials. Please try again.',
      }));
    }
  };

  return (
    <div className="login-container">
      <div className="login-info">
        <div className="small-bold-text red">Note: *This is for customers only</div>
        <div className="customer-login-form flex">

          <div className="common">
            <input
              type="text"
              className="login-email"
              placeholder="Enter email address"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)} />
            {errorMessages.email && <p className="customer-register-error">{errorMessages.email}</p>}
          </div>

          {/* Password Field */}
          <div className="common">
            <input
              type="password"
              className="login-email"
              placeholder="Enter password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            {errorMessages.password && <p className="customer-register-error">{errorMessages.password}</p>}
            {errorMessages.general && <p className="customer-register-error general-error">{errorMessages.general}</p>}

          </div>
        </div>

        {/* New Account and Forgot Password */}
        <div className="new-account flex">
          <a href="javascript:void(0)" className="create-new-acc" onClick={toggleForm}>
            Create a new account?
          </a>
          <a className="forgot-pass" href="#">
            Forgot password?
          </a>
        </div>

        {/* Terms and Conditions */}
        <div className="small-bold-text conditions" >
          <div className="condition-flex flex" style={{ gap: '10px' }}>
            <input
              type="checkbox"
              name="conditions"
              id="conditions"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />

            <label htmlFor="conditions" style={{ cursor: 'pointer' }}>
              I accept terms and conditions of look for worker
            </label>
          </div>
          {errorMessages.terms && <p className="customer-register-error login-condition-error">{errorMessages.terms}</p>}
        </div>

        {/* Submit Button */}
        <button className="primary-btn login-btn" onClick={handleLogin} style={{ marginTop: '10px' }}>
          Proceed
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
