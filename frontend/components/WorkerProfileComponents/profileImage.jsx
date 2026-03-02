import { React, useState, useEffect } from "react";
import '../../src/Worker-Profile/Worker-profile.css'
import axios from "axios";

const ProfileImage = ({ }) => {
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
    <div className="card card-primary card-outline">
      <div className="card-body box-profile position-relative">
        <div className="text-center position-relative">
          <img
            className="profile-user-img img-fluid img-circle"
            src={worker.file}
            alt="User profile"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          {/* Green online dot */}
          <div 
            className="position-absolute border border-white" 
            style={{ 
              width: "18px", 
              height: "18px", 
              bottom: "8px", 
              right: "32px",
              borderWidth: "3px"
            }}
          />
        </div>

        <h4 className="profile-username text-center mt-3">
          {worker.firstName} {worker.lastName}
        </h4>
        <p className="text-center fs-5 mb-4 text-muted">
          {worker.category} - {worker.subCategory}
        </p>

        <div className="row text-center border-top py-3 mb-4">
          <div className="col-4">
            <h3 className="  ">1,322</h3>
            <small className="text-muted d-block">JOBS</small>
          </div>
          <div className="col-4 border-left border-right">
            <h3 className="mb-0 font-weight-bold text-dark">543</h3>
            <small className="text-muted d-block">EARNINGS</small>
          </div>
          <div className="col-4">
            <h3 className="mb-0 font-weight-bold text-dark">4.5/5</h3>
            <small className="text-muted d-block">RATINGS</small>
          </div>
        </div>

        <a href="javascript:void(0)" className="btn btn-primary btn-block">
          <i className="fas fa-plus mr-1"></i> Follow User
        </a>
      </div>
    </div>
  );
};

export default ProfileImage;