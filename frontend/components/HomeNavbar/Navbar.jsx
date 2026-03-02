import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Navlogo from '../assets/logo.png';
import { Link, NavLink } from 'react-router-dom';
import LoginPopup from '../customerLogin/customerLogin';
import RegisterPopup from '../customerRegister/customerRegister';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
 
 
function Navbar({ registrationFormRef }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
 
 
  const handleLoginSuccess = (token) => {
    setIsAuthenticated(true);
    setIsPopupVisible(false);
 
    document.body.style.overflow = '';
    document.body.style.padding = "0";
    const modalBackdrops = document.querySelectorAll('.modal-backdrop');
    modalBackdrops.forEach((backdrop) => backdrop.remove());
    document.body.classList.remove('modal-open');
    navigate("/userprofile")
  };
 
  const handleLogout = async () => {
    try {
    
      const response = await fetch('http://localhost:8000/api/v1/users/logoutUser', {
        method: 'POST',
        credentials: 'include',
      });
     
      if (response.ok) {
       
        Cookies.remove('UseraccessToken');
        setIsAuthenticated(false);
        navigate("/");
      } else {
        Cookies.remove('UseraccessToken');
        setIsAuthenticated(false);
        navigate("/");
      }
    } catch (error) {
      console.error('Logout failed:', error);
      Cookies.remove('UseraccessToken');
      setIsAuthenticated(false);
      navigate("/");
    }
  };
 
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/users/checkUserLogin', {
          method: 'GET',
          credentials: 'include', 
        });
 
        if (response.ok) {
          const data = await response.json();
          if (data.loggedIn) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
 
    checkAuthStatus();
  }, []);
 
 
  // useEffect(() => {
  //   if (isPopupVisible) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = '';
  //   }
  //   return () => {
  //     document.body.style.overflow = '';
  //   };
  // }, [isPopupVisible]);
 
  window.onload = () => {
    document.body.style.overflow = "";
  };
 
 
  // const handleLogout = async () => {
  //   try {
  //     await axios.post('/logout', {}, { withCredentials: true });
  //     setIsAuthenticated(false);
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //   }
  // };
 
  // const scrollToForm = () => {
  //   if (registrationFormRef.current) {
  //     registrationFormRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };
      //  const openRegistrationPage = () =>{
      //   window.location.href = "./Openregistration.jsx";
      //   //  window.open("registration.html", "_blank");
      //  }
  const handleWorkerProfileLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/workers/check-login', {
        method: 'GET',
        credentials: 'include', 
      });
 
      if (response.ok) {
        const data = await response.json();
        if (data.loggedIn) {
          // Redirect to worker profile page
          navigate('/worker-profile');
        } else {
          navigate('/workerprofile');
        }
      } else {
        navigate('/workerprofile');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      navigate('/workerprofile');
    }
  };
 
  return (
    <>
      <nav className="navbar">
        <div className="container main-nav flex">
          <a href="/" className="logo-image">
            <img src={Navlogo} alt="Look for Worker Logo" />
          </a>
          <div className={`nav-links ${isOpen ? 'open' : ''}`} id="nav-links">
            <ul className="flex">
              <li>
                <Link to="/workerprofile" className="hover-links" onClick={handleWorkerProfileLogin}
                >Worker Profile</Link>
              </li>
              <li>
                <NavLink to="/findworker" className="hover-links">Find Worker</NavLink>
              </li>
              <li>
                <Link to="/support" className="hover-links">Support</Link>
              </li>
              {/* <li>
                <Link to="/admin" className="hover-links">Admin</Link>
              </li> */}
 
              {/* Show Sign In if not authenticated, otherwise show User Profile and Logout */}
              {isLoading ? (
                <li>Loading...</li>
              ) : !isAuthenticated ? (
                <li>
                  <button
                    type="button"
                    className="hover-links secondary-btn signin-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#authModal"
                    onClick={() => setIsLoginForm(true)}
                  >
                    Sign In
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/userprofile" className="hover-links">User Profile</Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="hover-links secondary-btn signin-btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              <li>
             <Link to="/worker-register" className="hover-links primary-btn">
              Register
             </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
 
      {/* Authentication Modal */}
      <div className="modal fade" id="authModal" tabIndex="-1" aria-labelledby="authModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="authModalLabel">
                {isLoginForm ? 'Login' : 'Register'}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {isPopupVisible && (
                isLoginForm ? (
                  <LoginPopup
                    toggleForm={() => setIsLoginForm(false)}
                    onLoginSuccess={handleLoginSuccess}
                  />
                ) : (
                  <RegisterPopup />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
 
export default Navbar;
 