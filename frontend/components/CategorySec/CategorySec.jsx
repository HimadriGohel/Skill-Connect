import React from 'react';
import './CategorySec.css';
// Importing assets directly (optional)
import cleanerImage from '../assets/cleaner.png';
import outdoorImage from '../assets/outdoor.png';
import electricityImage from '../assets/electricity.png';
import interiorImage from '../assets/interior-services.png';
import constructionImage from '../assets/construction-renovation.png';
import acImage from '../assets/ac-services.png';
import doorsImage from '../assets/doors.png';
import roofingImage from '../assets/roofing.png';
import kitchenImage from '../assets/kitchen.png';
import carpentryImage from '../assets/carpentry.png';
import automobilesImage from '../assets/automobiles.png';
import otherServicesImage from '../assets/other-services.png';

function CategorySec() {
  return (
    <>
      <section className="category-section">
        <div className="container">
          <div className="category-header">
            <h2 style={{color:"#ff9502"}}>Choose Your Category</h2>
          </div>
          <div className="category-box flex">
            <div className="c-box">
              <img src={cleanerImage} alt="Cleaner" className="category-image" />
              <div className="small-bold-text">Cleaning & car washing services</div>
            </div>
            <div className="c-box">
              <img src={outdoorImage} alt="Outdoor" className="category-image" />
              <div className="small-bold-text">Outdoor landscaping and gardening</div>
            </div>
            <div className="c-box">
              <img src={electricityImage} alt="Electricity" className="category-image" />
              <div className="small-bold-text">Electricity, Home Automation & Security</div>
            </div>
            <div className="c-box">
              <img src={interiorImage} alt="Interior Services" className="category-image" />
              <div className="small-bold-text">Interior design, Flooring & Interior painting</div>
            </div>
            <div className="c-box">
              <img
                src={constructionImage}
                alt="Construction and Renovation"
                className="category-image"
              />
              <div className="small-bold-text">Construction & Renovation</div>
            </div>
            <div className="c-box">
              <img src={acImage} alt="Air Conditioning" className="category-image" />
              <div className="small-bold-text">Air Conditioning & Ventilation</div>
            </div>
            <div className="c-box">
              <img src={doorsImage} alt="Doors & Windows" className="category-image" />
              <div className="small-bold-text">Doors & Windows service</div>
            </div>
            <div className="c-box">
              <img src={roofingImage} alt="Roofing" className="category-image" />
              <div className="small-bold-text">Roofing & Exterior painting</div>
            </div>
            <div className="c-box">
              <img src={kitchenImage} alt="Kitchen" className="category-image" />
              <div className="small-bold-text">Kitchen & Bathroom</div>
            </div>
            <div className="c-box">
              <img src={carpentryImage} alt="Carpentry" className="category-image" />
              <div className="small-bold-text">Carpentry</div>
            </div>
            <div className="c-box">
              <img src={automobilesImage} alt="Automobiles" className="category-image" />
              <div className="small-bold-text">Automobiles</div>
            </div>
            <div className="c-box">
              <img src={otherServicesImage} alt="Other Services" className="category-image" />
              <div className="small-bold-text">Other services</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CategorySec;
