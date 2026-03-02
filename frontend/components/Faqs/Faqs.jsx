import React, { useState } from 'react';
import './Faqs.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq container">
      <div className="faq-header">
        <h2 style={{color:"#ff9502"}}>FAQ</h2>
      </div>
      <div className="faq-questions">
        <div className="accordion">
          {faqData.map((item, index) => (
            <div key={index} className="accordion-item-border">

              <div
                className={`accordion-item-header small-bold-text ${activeIndex === index ? 'active' : ''}`}
                onClick={() => toggleAccordion(index)}
              >
                {item.question}
              </div>


              <div className={`accordion-item-body ${activeIndex === index ? 'active' : ''}`}>
                <div className="accordion-item-body-content">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sample FAQ data
const faqData = [
  {
    question: "Who are we?",
    answer: "Look for worker is a best platform for skill worker. The platform where skill worker can find work. since 2022 , we helped to connect 1000 worker to needy customers.",
  },
  {
    question: "How does my worker profile request work?",
    answer: "Making worker profile is simple, quick and without obligation. you fill out the information related to your work and your contact information. Your profile is then shows to customers in your region who contact you to offer you their offers. All you have to do is make satisfy your customer with your good service.",
  },
  {
    question: "Why use the Look for Worker service?",
    answer: "Look for worker allows you to select the best craftsmen to carry out your work and to compare the worker profile and choose out the worker which fill out your requirements. In addition to being free, the Look for worker service is simple and fast!",
  },
  {
    question: "Am I committed by my work request?",
    answer: "After choosing one of the available options, customers will have the opportunity to request your services. If you decide to decline a customer's request, a 10% reduction in your earnings will be applied.",
  },
  {
    question: "What should I consider when choosing a worker?",
    answer: "First check the availablity of the worker, if worker is available then proceed to next step, Here is some parameters which you have to consider before choosing the worker check the worker profile, recent work, work experience, reviews & feedback from recent work of worker, is this fit in your budget? if this full fill your requirements then surely go for it!",
  },
];

export default FAQ;
