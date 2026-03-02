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
        <strong>
          <i className="fas fa-book mr-1"></i> Personal Details
        </strong>
        <ul className="list-group list-group-unbordered">
          <li className="list-group-item child-upper text-muted">
            <span style={{ fontWeight: 500 }}>Email: </span> {worker.email}
          </li>
          <li className="list-group-item text-muted">
            <span style={{ fontWeight: 500 }}>Phone: </span> {worker.phone}
          </li>
          <li className="list-group-item text-muted child-bottom">
            <span style={{ fontWeight: 500 }}>ID Ref: </span> {worker.aadhar}
          </li>
        </ul>

        <hr />
        <strong>
          <i className="fas fa-map-marker-alt mr-1"></i> Location
        </strong>
        <ul className="text-muted list-group list-group-unbordered">
          <li className="text-muted list-group-item child-upper mb-0 pb-1">
            <span style={{ fontWeight: 500 }}>City: </span> {worker.city}
          </li>
          <li className="text-muted list-group-item child-bottom mb-0 pb-0">
            <span style={{ fontWeight: 500 }}>Zip Code: </span> {worker.postalCode}
          </li>
        </ul>

        <hr />
        <strong>
          <i className="fas fa-pencil-alt mr-1"></i> Work Stastics
        </strong>
        <ul className="text-muted list-group list-group-unbordered">
          <li className="list-group-item child-upper text-muted">
            <span style={{ fontWeight: 500 }}>Hourly Pay: </span> ${worker.hourlyPay}/hr
          </li>
          <li className="list-group-item child-bottom text-muted">
            <span style={{ fontWeight: 500 }}>Period: </span> {worker.desiredPeriod} hours
          </li>
        </ul>

        <hr />
        <strong>
          <i className="far fa-file-alt mr-1"></i> Bio
        </strong>
        <p className="text-muted">{worker.workerDetails}</p>
      </div>
    </div>
  );
};

export default AboutMeBox;