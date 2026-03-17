import  { useState } from 'react';
import './otherPageNavbar.css';
import Navlogo from '../assets/logo.png';
import { NavLink, useLocation } from 'react-router-dom';
import barsSolid from '../assets/bars-solid.svg';
import SignIn from '../customerLogin/customerLogin';

function Navbar({ registrationFormRef }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToForm = () => {
    if (registrationFormRef.current) {
      registrationFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const closeLoginPopup = () => {
    setIsLoginOpen(false);
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
                <NavLink
                  to="/"
                  className={({ isActive }) => isActive ? "hover-links active-link" : "hover-links"}
                >
                  Home
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/workerprofile"
                  onClick={handleWorkerProfileLogin}
                  className={({ isActive }) => isActive ? "hover-links active-link" : "hover-links"}
                >
                  Worker Profile
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/findworker"
                  className={({ isActive }) => isActive ? "hover-links active-link" : "hover-links"}
                >
                  Find Worker
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/support"
                  className={({ isActive }) => isActive ? "hover-links active-link" : "hover-links"}
                >
                  Support
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) => isActive ? "hover-links active-link" : "hover-links"}
                >
                  Admin
                </NavLink>
              </li> */}
              {location.pathname === '/' && (
                <li>
                  <button
                    className="hover-links secondary-btn signin-btn"
                    onClick={handleLoginClick}
                  >
                    Sign In
                  </button>
                </li>
              )}
              {/* <li>
                <button className="hover-links primary-btn" onClick={scrollToForm}>Register</button>
              </li> */}
            </ul>
          </div>
            <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>☰</button>
        </div>
      </nav>

      {/* Authentication Modal */}
      {/* {isLoginOpen && (
        <div
          className="modal fade show"
          tabIndex="-1"
          aria-labelledby="authModalLabel"
          aria-hidden="true"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="authModalLabel">Sign In</h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeLoginPopup}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <SignIn closeModal={closeLoginPopup} />
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

export default Navbar;
