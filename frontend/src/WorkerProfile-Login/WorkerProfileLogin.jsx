import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkerProfileLogin.css';
import axios from 'axios';
import { API } from '../api/axios';

function WorkerProfile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const checkLoginStatus = async () => {
      setLoading();
      try {
        const response = await API.get('/workers/login', {
          withCredentials: true,
        });

        if (response.data.loggedIn) {
          setIsLoggedIn(true);

        }
      } catch (error) {
        setIsLoggedIn(false);
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
              <form className="flex login-form" onSubmit={handleLogin}>
                {error && <p className="error-message">{error}</p>}
                <h6>Login</h6>
                <input
                  type="email"
                  name="email"
                  id="profile-email"
                  placeholder="E-mail address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="password-flex" id='password-flex'>
                  <input
                    type={showPassword ? 'text' : 'password'} // Conditional type based on showPassword
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

                <a className="forgot-pass" href="#">
                  Forgot password?
                </a>


                <button type="submit" className="login-btn primary-btn" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default WorkerProfile;
