// WorkerProfileSettingsModal.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const WorkerProfileSettingsModal = ({ worker, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    workerDetails: "",
    aadhar: "",
    address: "",
    desiredPeriod: "",
    hourlyPay: "",
    postalCode: "",
    city: "",
    termsAgreed: false,
  });

  // Fill form when component mounts
  useEffect(() => {
    if (worker) {
      setFormData({
        firstName: worker.firstName || "",
        lastName: worker.lastName || "",
        email: worker.email || "",
        phone: worker.phone || "",
        workerDetails: worker.workerDetails || "",
        aadhar: worker.aadhar || "",
        address: worker.address || "",
        desiredPeriod: worker.desiredPeriod || "",
        hourlyPay: worker.hourlyPay || "",
        postalCode: worker.postalCode || "",
        city: worker.city || "",
        termsAgreed: false, // usually reset on each edit
      });
    }
  }, [worker]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/v1/workers/editWorkerInfo",
        formData,
        { withCredentials: true }
      );
      onSuccess(); // close modal + refresh
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Profile</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Same fields as your original Settings */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label">Worker Details</label>
                  <textarea
                    className="form-control"
                    name="workerDetails"
                    value={formData.workerDetails}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Aadhar</label>
                  <input
                    type="text"
                    className="form-control"
                    name="aadhar"
                    value={formData.aadhar}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Postal Code</label>
                  <input
                    type="number"
                    className="form-control"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Hourly Pay</label>
                  <input
                    type="number"
                    className="form-control"
                    name="hourlyPay"
                    value={formData.hourlyPay}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                  />
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label">Desired Period</label>
                  <input
                    type="text"
                    className="form-control"
                    name="desiredPeriod"
                    value={formData.desiredPeriod}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="termsAgreed"
                      checked={formData.termsAgreed}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label">
                      I agree to the <a href="#">terms and conditions</a>
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-danger">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfileSettingsModal;