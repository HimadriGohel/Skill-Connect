import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkerProfileLogin.css';
import axios from 'axios';
import { API } from '../api/axios';

function WorkerProfile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      setLoading(true);
      try {
        const response = await API.get('/workers/login', {
          withCredentials: true,
        });

        if (response.data.loggedIn) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/worker-profile');
    }
  }, [isLoggedIn, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please Enter both email and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await API.post('/workers/login', { email, password }, {
        withCredentials: true,
      });
      console.log(response.data);
      if (response) {
        navigate('/worker-profile');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email || !newPassword || !confirmPassword) {
      setError('Please enter all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await API.post('/workers/reset-password', { 
        email, 
        password: newPassword 
      }, {
        withCredentials: true,
      });
      console.log(response.data);
      if (response) {
        setError('Password reset successful! You can now log in with your new password.');
        setShowForgotPassword(false);
        setNewPassword('');
        setConfirmPassword('');
        setEmail(''); // Clear email after success
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="profile-main">
        <div className="box-shadow flex">
          <div className="profile-left">
            <div className="worker-image">
              <img src='../../components/assets/photo-college.png' alt="worker image" />
            </div>
          </div>
          <div className="profile-right">
            <div className="login-main">
              <form 
                className="flex login-form" 
                onSubmit={showForgotPassword ? handleResetPassword : handleLogin}
              >
                {error && <p className="error-message">{error}</p>}
                <h6>{showForgotPassword ? 'Reset Password' : 'Login'}</h6>
                
                <input
                  type="email"
                  name="email"
                  id="profile-email"
                  placeholder="E-mail address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {!showForgotPassword ? (
                  <>
                    <div className="password-flex" id='password-flex'>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <img
                        id="eye-icon"
                        className="open"
                        src={`/assets/image/${showPassword ? 'open-eye.png' : 'close-eye.png'}`}
                        alt={showPassword ? "Hide password" : "Show password"}
                        onClick={togglePasswordVisibility}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>

                    <a 
                      className="forgot-pass" 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setShowForgotPassword(true);
                        setError('');
                      }}
                    >
                      Forgot password?
                    </a>

                    <button type="submit" className="login-btn primary-btn" disabled={loading}>
                      {loading ? 'Logging in...' : 'Login'}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="password-flex" id='new-password-flex'>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="New Password"
                        id="new-password"
                        name="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <img
                        id="new-eye-icon"
                        className="open"
                        src={`/assets/image/${showNewPassword ? 'open-eye.png' : 'close-eye.png'}`}
                        alt={showNewPassword ? "Hide new password" : "Show new password"}
                        onClick={toggleNewPasswordVisibility}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>

                    <div className="password-flex" id='confirm-password-flex'>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Confirm New Password"
                        id="confirm-password"
                        name="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <img
                        id="confirm-eye-icon"
                        className="open"
                        src={`/assets/image/${showNewPassword ? 'open-eye.png' : 'close-eye.png'}`}
                        alt={showNewPassword ? "Hide confirm password" : "Show confirm password"}
                        onClick={toggleNewPasswordVisibility}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>

                    <a 
                      className="forgot-pass" 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setShowForgotPassword(false);
                        setError('');
                        setNewPassword('');
                        setConfirmPassword('');
                      }}
                    >
                      Back to Login
                    </a>

                    <button type="submit" className="login-btn primary-btn" disabled={loading}>
                      {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkerProfile;