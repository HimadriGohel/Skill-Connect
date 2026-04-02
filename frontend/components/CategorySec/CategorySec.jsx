import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './CategorySec.css';

import { useNavigate } from "react-router-dom";
  
import cleaningImg from '../assets/cleaning and cae washing.jpg';
import landscapingImg from '../assets/gardening.jpg';
import electricianImg from '../assets/Electricity, Home Automation & Security.jpg';
import interiorImg from '../assets/Interior design, Flooring & Interior painting.jpg';
import constructionImg from '../assets/Construction & Renovation.jpg';
import acTechnicianImg from '../assets/Air Conditioning & Ventilation.jpg';
import doorsWindowsImg from '../assets/Doors & Windows service.jpg';
import roofingImg from '../assets/Roofing & Exterior painting.jpg';
import kitchenBathroomImg from '../assets/Kitchen & Bathroom.jpg';
import carpenterImg from '../assets/Carpentry.jpg';
import automobileImg from '../assets/automobiles.png';

const categories = [
  {
    title: "Cleaning & Car Washing",
    desc: "Deep cleaning, home sanitization",
    image: cleaningImg,
  },
  {
    title: "Landscaping & Gardening",
    desc: "Lawn care, plant maintenance",
    image: landscapingImg,
  },
  {
    title: "Electricity, Automation & Security",
    desc: "Wiring, smart switches, CCTV & security",
    image: electricianImg,
  },
  {
    title: "Interior Design, Flooring & Painting",
    desc: "Flooring, false ceiling, wall painting",
    image: interiorImg,
  },
  {
    title: "Construction & Renovation",
    desc: "New construction, home extension",
    image: constructionImg,
  },
  {
    title: "Air Conditioning & Ventilation",
    desc: "AC installation, repair, gas filling",
    image: acTechnicianImg,
  },
  {
    title: "Doors & Windows Service",
    desc: "UPVC, aluminium, wooden doors",
    image: doorsWindowsImg,
  },
  {
    title: "Roofing & Exterior Painting",
    desc: "Waterproofing, terrace treatment",
    image: roofingImg,
  },
  {
    title: "Kitchen & Bathroom",
    desc: "Modular kitchen, bathroom renovation",
    image: kitchenBathroomImg,
  },
  {
    title: "Carpentry",
    desc: "Furniture making, repair, polishing",
    image: carpenterImg,
  },
  {
    title: "Automobiles",
    desc: "Car mechanic, denting painting, detailing",
    image: automobileImg,
  },
];

function CategorySec() {
  const navigate = useNavigate();  

  const settings = {
    dots: true,
    dotsClass: "custom-slick-dots",
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    arrows: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className="category-section">
      <div className="container">
        <h2 className="section-title">
          Choose Your <span className="highlight">Category</span>
        </h2>

        <div className="slider-container">
          <Slider {...settings}>
            {categories.map((cat, index) => (
              <div 
                key={index} 
                className="service-card-wrapper"
                onClick={() => navigate('/findworker')}   
                style={{ cursor: 'pointer' }}            
              >
                <div className="service-card">
                  <div className="card-image-wrapper">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="card-image"
                    />
                  </div>
                  <div className="card-content">
                    <h3 className="card-title1">{cat.title}</h3>
                    <p className="card-description">{cat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default CategorySec;