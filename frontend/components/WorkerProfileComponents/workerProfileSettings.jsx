import React, { useState, useEffect } from "react";
import axios from "axios";
import '../WorkerProfileComponents/workerProfileCss.css'
import '../../src/Worker-Profile/Worker-Profile.css'

const Settings = () => {
  // State for form inputs
  const [formDataWorker, setFormDataWorker] = useState({
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


  useEffect(() => {
    const fetchWorkerDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/workers/getWorkerprofile", { withCredentials: true });
        console.log("API Response:", response.data);
        setFormDataWorker(response.data.data.worker)
        console.log("Updated formDataWorker:", response.data.data.worker);
      } catch (error) {
        console.error("Error fetching worker details:", error);
        alert("Failed to fetch worker details. Please try again.");
      }
    };
    fetchWorkerDetails();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormDataWorker((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/workers/editWorkerInfo", formDataWorker,
        { withCredentials: true });
      window.location.reload();
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  return (
    <div className="tab-pane" id="settings">
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">
            First Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputName"
              name="firstName"
              value={formDataWorker.firstName}
              onChange={handleChange}
              placeholder="firstName"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">
            Last Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputName"
              name="lastName"
              value={formDataWorker.lastName}
              onChange={handleChange}
              placeholder="lastName"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={formDataWorker.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">
            phone
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={formDataWorker.phone}
              onChange={handleChange}
              placeholder="phone"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">
            Worker Details
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="workDetails"
              name="workerDetails"
              value={formDataWorker.workerDetails}
              onChange={handleChange}
              placeholder="workerDetails"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">
            Aadhar
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="aadhar"
              name="aadhar"
              value={formDataWorker.aadhar}
              onChange={handleChange}
              placeholder="Aadhar"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">
            Address
          </label>
          <div className="col-sm-10">
            <input
              type="textarea"
              className="form-control"
              id="address"
              name="address"
              value={formDataWorker.address}
              onChange={handleChange}
              placeholder="Address"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">
            desired Period
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="desiredPeriod"
              name="desiredPeriod"
              value={formDataWorker.desiredPeriod}
              onChange={handleChange}
              placeholder="desired Period"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">
            hourlypay
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="hourlyPay"
              name="hourlyPay"
              value={formDataWorker.hourlyPay}
              onChange={handleChange}
              placeholder="hourlyPay"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">
            postalCode
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="postalCode"
              name="postalCode"
              value={formDataWorker.postalCode}
              onChange={handleChange}
              placeholder="postalCode"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">
            City
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={formDataWorker.city}
              onChange={handleChange}
              placeholder="city"
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="offset-sm-2 col-sm-10">
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  name="agree"
                  checked={formDataWorker.agree}
                  onChange={handleChange}
                  required
                />{" "}
                I agree to the <a href="#">terms and conditions</a>
              </label>
            </div>
          </div>
        </div>

        <div className="form-group row">
          <div className="offset-sm-2 col-sm-10">
            <button type="submit" className="btn btn-danger">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>

  );
};

export default Settings;
