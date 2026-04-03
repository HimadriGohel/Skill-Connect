
import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../src/Worker-Profile/Worker-profile.css';
import { FaPencilAlt } from "react-icons/fa";           
import WorkerProfileSettingsModal from "./WorkerProfileSettingsModal"; 

const ProfileImage = () => {
  const [worker, setWorker] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/workers/getWorkerprofile",
          { withCredentials: true }
        );
        setWorker(response.data.data.worker);
      } catch (error) {
        console.error("Error fetching worker data:", error);
      }
    };
  
    fetchWorkerData();
  }, []);

  if (!worker) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="card card-primary card-outline">
        <div className="card-body box-profile position-relative">
          <div className="text-center position-relative">
            <img
              className="profile-user-img img-fluid img-circle"
              src={worker.file || "/default-profile.png"} // fallback image if needed
              alt="User profile"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />

            
            <button
              className="btn btn-sm btn-light rounded-circle position-absolute shadow-sm"
              style={{
                bottom: "12px",
                right: "-10px",
                top: "-10px",
                // width: "38px",
                height: "38px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid white",
              }}
              onClick={() => setShowEditModal(true)}
              title="Edit Profile"
            >
              <FaPencilAlt size={16} />
            </button>

            {/* Green online dot - optional keep or remove */}
            {/* <div
              className="position-absolute border border-white bg-success rounded-circle"
              style={{
                width: "18px",
                height: "18px",
                bottom: "8px",
                right: "32px",
                borderWidth: "3px",
              }}
            /> */}
          </div>

          <h4 className="profile-username text-center mt-3">
            {worker.firstName} {worker.lastName}
          </h4>
          <p className="text-center fs-5 mb-4 text-muted">
            {worker.category} - {worker.subCategory}
          </p>

          <div className="row text-center border-top py-3 mb-4">
            <div className="col-4">
              <h3>1,322</h3>
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
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <WorkerProfileSettingsModal
          worker={worker}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false);
            // Optional: refresh worker data after save
            window.location.reload(); // or better: refetch worker
          }}
        />
      )}
    </>
  );
};

export default ProfileImage;