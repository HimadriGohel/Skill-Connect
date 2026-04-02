// UserProfile.jsx
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './UserProfile.css';         
import { FaUser, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API } from "../api/axios";

function UserProfile() {
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    email: '',
    phone: ''
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await API.get('/user/getUserData', { withCredentials: true });
        console.log(userResponse.data.data.user);
        setUserDetails(userResponse.data.data.user);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchUserData();
    const intervalId = setInterval(fetchUserData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [editDetails, setEditDetails] = useState({
    fullName: '', address: '', email: '', phone: ''
  });

  const handleEditClick = () => {
    setEditDetails(userDetails);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditDetails((prev) => ({ ...prev, [name]: value }));
  };

  const [updateLoading, setUpdateLoading] = useState(false);

  const handleUpdateProfile = async () => {
    setUpdateLoading(true);
    try {
      await API.post('/user/editUserData', { ...editDetails }, { withCredentials: true });
      setUserDetails((prev) => ({ ...prev, ...editDetails }));
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setUpdateLoading(false);
    }
  };

  const [workerRequests, setWorkerRequests] = useState([]);

  useEffect(() => {
    const fetchWorkerStatus = async () => {
      try {
        const response = await API.get("/user/fetchHistory", { withCredentials: true });
        console.log("API Response:", response.data);
        if (Array.isArray(response.data?.data)) {
          setWorkerRequests(response.data.data);
        } else {
          setWorkerRequests([]);
        }
      } catch (error) {
        console.error("Error fetching worker requests:", error);
      }
    };
    fetchWorkerStatus();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  // Dynamic counts based on workerRequests
  const pendingCount = workerRequests.filter(req => req.status?.toLowerCase() === 'pending').length;
  const acceptedCount = workerRequests.filter(req => req.status?.toLowerCase() === 'accepted').length;
  const rejectedCount = workerRequests.filter(req => req.status?.toLowerCase() === 'rejected').length;

  return (
    <div className="user-profile-page container py-4" id="user-profile">

      <h1 className="welcome-title mb-5">
        Welcome, <span>{userDetails.fullName || "User"}</span>
           <p>Manage your workspace and hiring history here.</p>
      </h1>


      <div className="row g-4">

        <div className="col-lg-6">
          <div className="card profile-card h-100 shadow">
            <div className="card-header">
              <h3><span className="material-symbols-outlined">person_check</span>Personal Details</h3>
            </div>
            <div className="card-body">
              <div className="detail-item">
                <FaUser className="detail-icon" />
                <div>
                  <strong>Name:</strong>
                  <span>{userDetails.fullName}</span>
                </div>
              </div>

              <div className="detail-item">
                <FaMapMarkerAlt className="detail-icon" />
                <div>
                  <strong>Address:</strong>
                  <span>{userDetails.address}</span>
                </div>
              </div>

              <div className="detail-item">
                <FaEnvelope className="detail-icon" />
                <div>
                  <strong>Email:</strong>
                  <span>{userDetails.email}</span>
                </div>
              </div>

              <div className="detail-item">
                <FaPhoneAlt className="detail-icon" />
                <div>
                  <strong>Phone:</strong>
                  <span>{userDetails.phone}</span>
                </div>
              </div>

              <button
                className="btn edit-btn w-100 mt-4"
                onClick={handleEditClick}
                data-bs-toggle="modal"
                data-bs-target="#editModal"
              >
                <FaEdit className="me-2" /> Edit Profile
              </button>
            </div>
          </div>
        </div>

        
        <div className="col-lg-6">
          <div className="card profile-card h-100 shadow">
            <div className="card-header">
              <h3><span className="material-symbols-outlined">timeline</span>Overview</h3>
            </div>
            <div className="card-body">
              <div className="row g-3 text-center">
                <div className="col-4">
                  <div className="stat-box-hire">
                    <span className="material-symbols-outlined">task_alt</span><h6>Accepting<br></br>Requests</h6>
                    <div className="stat-number">{acceptedCount}</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-box-pending">
                    <span className="material-symbols-outlined">pending_actions</span><h6>Pending Requests</h6>
                    <div className="stat-number">{pendingCount}</div>
                  </div>
                </div>
                  <div className="col-4">
                  <div className="stat-box-task">
                    <span className="material-symbols-outlined">cancel</span><h6>Rejecting Requests</h6>
                    <div className="stat-number">{rejectedCount}</div>
                  </div>
                </div>
                 <div className="activity"><span>Activity analytics will appear here as you start hiring.</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="card profile-card shadow mt-4">
        <div className="card-header">
        <h3><span className="material-symbols-outlined">history_2</span>Hiring History</h3>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Worker Name</th>
                  <th>Category</th>
                  <th>Sub-Category</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {workerRequests.length > 0 ? (
                  workerRequests.map((req, i) => (
                    <tr key={i}>
                      <td>{req.worker?.firstName} {req.worker?.lastName || "Not assigned"}</td>
                      <td>{req.worker?.category || "N/A"}</td>
                      <td>{req.worker?.subCategory || "N/A"}</td>
                      <td>
                        {req.requestDate
                          ? new Date(req.requestDate).toLocaleDateString('en-GB')
                          : "N/A"}
                      </td>
                      <td>
                        <span className={`status-badge status-${req.status?.toLowerCase() || 'pending'}`}>
                          {req.status ? req.status.charAt(0).toUpperCase() + req.status.slice(1) : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      No hiring history found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>


      <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Profile</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" name="fullName" value={editDetails.fullName} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" name="address" value={editDetails.address} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" value={editDetails.email} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" name="phone" value={editDetails.phone} onChange={handleChange} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdateProfile} disabled={updateLoading}>
                {updateLoading ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default UserProfile;