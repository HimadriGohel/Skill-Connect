import React, { useState } from 'react';
import './customerLogin.css';
import Cookies from 'js-cookie';
import { API } from '../../src/api/axios';

const LoginPopup = ({ toggleForm, onLoginSuccess }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [errorMessages, setErrorMessages] = useState({
    email: '', password: '', terms: '', general: '',
    newPassword: '', confirmPassword: '',
  });

  const handleLogin = async () => {
    const errors = { email: '', password: '', terms: '', general: '', newPassword: '', confirmPassword: '' };
    let isValid = true;

    if (!loginEmail.trim()) { errors.email = 'Email is required'; isValid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail)) {
      errors.email = 'Invalid email format'; isValid = false;
    }
    if (!loginPassword.trim()) { errors.password = 'Password is required'; isValid = false; }
    if (!acceptTerms) { errors.terms = 'You must accept the terms and conditions'; isValid = false; }

    setErrorMessages(errors);
    if (!isValid) return;

    try {
      const response = await API.post('/user/loginUser', { email: loginEmail, password: loginPassword }, { withCredentials: true });
      if (response.status === 200) {
        alert("Login successful");
        const token = response.data.data.UseraccessToken;
        Cookies.set('UseraccessToken', token, { expires: 7, path: '/', sameSite: 'Lax', secure: false });
        onLoginSuccess?.(token);
        toggleForm();
      }
    } catch (error) {
      setErrorMessages((prev) => ({
        ...prev,
        general: error.response?.data?.message || 'Invalid credentials. Please try again.',
      }));
    }
  };


  const handleResetPassword = async () => {
    const errors = { email: '', password: '', terms: '', general: '', newPassword: '', confirmPassword: '' };
    let isValid = true;

    if (!loginEmail.trim()) { errors.email = 'Email is required'; isValid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail)) {
      errors.email = 'Invalid email format'; isValid = false;
    }
    if (!newPassword.trim()) { errors.newPassword = 'New Password is required'; isValid = false; }
    if (!confirmPassword.trim()) { errors.confirmPassword = 'Confirm Password is required'; isValid = false; }
    if (newPassword !== confirmPassword) {
      errors.general = 'New password and confirm password do not match';
      isValid = false;
    }

    setErrorMessages(errors);
    if (!isValid) return;

    try {
      const response = await API.post(
        '/user/reset-password',           
        { email: loginEmail, password: newPassword },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Password reset successful");
        setShowForgotPassword(false);
        setNewPassword('');
        setConfirmPassword('');
        setErrorMessages({ email: '', password: '', terms: '', general: '', newPassword: '', confirmPassword: '' });
      }
    } catch (error) {
      setErrorMessages((prev) => ({
        ...prev,
        general: error.response?.data?.message || 'An error occurred. Please try again.',
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
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            {errorMessages.email && <p className="customer-register-error">{errorMessages.email}</p>}
          </div>

          {!showForgotPassword ? ( 
            <div className="common">
              <input
                type="password"
                className="login-email"
                placeholder="Enter password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              {errorMessages.password && <p className="customer-register-error">{errorMessages.password}</p>}
            </div>
          ) : (
        
            <>
              <div className="common">
                <input
                  type="password"
                  className="login-email"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {errorMessages.newPassword && <p className="customer-register-error">{errorMessages.newPassword}</p>}
              </div>

              <div className="common">
                <input
                  type="password"
                  className="login-email"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errorMessages.confirmPassword && <p className="customer-register-error">{errorMessages.confirmPassword}</p>}
              </div>
            </>
          )}

          {errorMessages.general && (
            <p className="customer-register-error general-error" style={{ marginTop: '8px', gridColumn: '1 / -1' }}>
              {errorMessages.general}
            </p>
          )}
        </div>

       
        <div className="new-account flex">
          <a href="javascript:void(0)" className="create-new-acc" onClick={toggleForm}>
            Create a new account?
          </a>

          {!showForgotPassword ? (
            <a
              className="forgot-pass"
              href="javascript:void(0)"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot password?
            </a>
          ) : (
            <a
              className="forgot-pass"
              href="javascript:void(0)"
              onClick={() => {
                setShowForgotPassword(false);
                setNewPassword('');
                setConfirmPassword('');
              }}
            >
              Back to Login
            </a>
          )}
        </div>


        {!showForgotPassword && (
          <div className="small-bold-text conditions">
            <div className="condition-flex flex" style={{ gap: '10px' }}>
              <input
                type="checkbox"
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
        )}

        <button
          className="primary-btn login-btn"
          onClick={showForgotPassword ? handleResetPassword : handleLogin}
          style={{ marginTop: '15px' }}
        >
          {showForgotPassword ? 'Reset Password' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;