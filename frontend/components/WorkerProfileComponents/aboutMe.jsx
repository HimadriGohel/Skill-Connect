import { React, useState, useEffect } from "react";
import axios from "axios";
import '../../src/Worker-Profile/Worker-profile.css'

const AboutMeBox = ({ }) => {
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/workers/getWorkerprofile', { withCredentials: true });
        setWorker(response.data.data.worker);
      } catch (error) {
        console.error('Error fetching worker data:', error);
      }
    };

    fetchWorkerData();
  }, []);

  if (!worker) {
    return <div>Loading...</div>;
  }
  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">About Profile</h3>
      </div>
      <div className="card-body">
       <div className="personal-row">
      <strong className="personal-title">
        <span className="material-symbols-outlined" id="person">person_apron</span>
        Personal Details
      </strong>

      <ul className="personal-details">
        <li>{worker.email}</li>
        <li>{worker.phone}</li>
        <li>{worker.aadhar}</li>
      </ul>
      </div>
      
   <br></br> 
        <div className="personal-row">
        <strong><i className="fas fa-map-marker-alt mr-1" id="location"></i>Location</strong>
        <ul className="personal-details">
          <li>{worker.city}</li>
          <li>{worker.postalCode}</li>
        </ul>
        </div>

       <br></br>

        <div className="personal-row">
        <strong>
         <span className="material-symbols-outlined" id="work">payments</span> Work Stastics
        </strong>
        <ul className="personal-details">
          <li>${worker.hourlyPay}/hr</li>
          <li>{worker.desiredPeriod} hours</li>
        </ul>
        </div>

        <br></br>

         <div className="personal-row">
        <strong>
          <span className="material-symbols-outlined" id="bio">article</span> Bio
        </strong>
         <ul className="personal-details">
            <li>{worker.workerDetails}</li>
            </ul>
            </div>
      </div>
    </div>
  );
};

export default AboutMeBox;