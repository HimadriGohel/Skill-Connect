// import React from 'react';
import './Header.css';
import workManImg from '../assets/workman.jpg';

const Header = () => {
  return (
    <header>
      <div className="container header-section flex">
        <div className="header-left">
       <h1 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            Looking for a
        <span style={{ color: "#ff9502", fontSize: "3rem", fontWeight: "bold" }}>
         worker?
        </span>
        </h1>

          <p style={{ marginTop: '25px' }}>
            In just a few mouse clicks, we bring you the best local craftsmen
            who are perfect for your needs.
          </p>
          <div className="logo-panel flex">
            <div className="logo-box flex">
              <div className="logo-layer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  className="first"
                  fill="orange"
                  viewBox="0 0 448 512"
                >
                  <path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z" />
                </svg>
              </div>
              <div className="small-bold-text logo-desc">
                Easy and fast service
              </div>
            </div>
            <div className="logo-box flex">
              <div className="logo-layer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  fill="orange"
                  className="first"
                  viewBox="0 0 576 512"
                >
                  <path d="M256 32c-17.7 0-32 14.3-32 32v2.3 99.6c0 5.6-4.5 10.1-10.1 10.1-3.6 0-7-1.9-8.8-5.1L157.1 87C83 123.5 32 199.8 32 288v64H544l0-66.4c-.9-87.2-51.7-162.4-125.1-198.6l-48 83.9c-1.8 3.2-5.2 5.1-8.8 5.1-5.6 0-10.1-4.5-10.1-10.1V66.3 64c0-17.7-14.3-32-32-32H256zM16.6 384C7.4 384 0 391.4 0 400.6c0 4.7 2 9.2 5.8 11.9C27.5 428.4 111.8 480 288 480s260.5-51.6 282.2-67.5c3.8-2.8 5.8-7.2 5.8-11.9 0-9.2-7.4-16.6-16.6-16.6H16.6z" />
                </svg>
              </div>
              <div className="small-bold-text logo-desc">
                Over 100 skilled craftsmen
              </div>
            </div>
            <div className="logo-box flex">
              <div className="logo-layer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  fill="orange"
                  className="first"
                  viewBox="0 0 576 512"
                >
                  <path d="M565.6 36.2C572.1 40.7 576 48.1 576 56V392c0 10-6.2 18.9-15.5 22.4l-168 64c-5.2 2-10.9 2.1-16.1.3L192.5 417.5l-160 61c-7.4 2.8-15.7 1.8-22.2-2.7S0 463.9 0 456V120c0-10 6.1-18.9 15.5-22.4l168-64c5.2-2 10.9-2.1 16.1-.3L383.5 94.5l160-61c7.4-2.8 15.7-1.8 22.2 2.7zM48 136.5V421.2l120-45.7V90.8L48 136.5zM360 422.7V137.3l-144-48V374.7l144 48zm48-1.5l120-45.7V90.8L408 136.5V421.2z" />
                </svg>
              </div>
              <div className="small-bold-text logo-desc">
                Find worker nearby your area
              </div>
            </div>
          </div>
        </div>
        <div className="header-right">
          <img src={workManImg} alt="worker" />
        </div>
      </div>
    </header>
  );
};

export default Header;
