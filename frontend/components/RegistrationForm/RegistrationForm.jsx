import React, { useState, useEffect } from "react";
import { API } from "../../src/api/axios";
import "./RegistrationFrom.css";
// import axios from "axios";  // 

export const RegistrationForm = ({ formRef }) => {
  const initialFormData = {
    category: "",
    subCategory: "",
    desiredPeriod: "",
    hourlyPay: "",
    workerDetails: "",
    file: null,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    aadhar: "",
    password: "",
    confirmPassword: "",
    workExperience: "",
    postalCode: "",
    city: "",
    address: "",
    termsAccepted: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/category/getCategory");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
        setTimeout(fetchCategories, 2000);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategory(selectedCategoryId);
    const selectedCat = categories.find((category) => category._id === selectedCategoryId);
    setFormData((prevData) => ({
      ...prevData,
      category: selectedCat ? selectedCat.category : "",
      subCategory: "",
    }));
    setSubCategories([]);

    try {
      const response = await API.get(`/subCategory/getSubCategories/${selectedCategoryId}`);
      if (response.data.length > 0) {
        setSubCategories(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if ((name === "phone" && value.length > 10) || (name === "aadhar" && value.length > 12)) {
      return;
    }
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    });
  };

  const validateStep1 = () => {
    const { firstName, lastName, phone, email, address, aadhar, file, password, confirmPassword, postalCode, city } =
      formData;

    if (!firstName || !lastName || !phone || !email || !address || !aadhar || !file || !password || !confirmPassword || !postalCode || !city) {
      alert("Please fill in all personal details.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
      alert("Phone number must be exactly 10 digits.");
      return false;
    }

    const aadharPattern = /^\d{12}$/;
    if (!aadharPattern.test(aadhar)) {
      alert("Aadhaar number must be exactly 12 digits.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);
      return;
    }

   
    if (!formData.termsAccepted) {
      alert("You must accept the terms and conditions.");
      return;
    }

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    setIsLoading(true);
    try {
      const res = await API.post("/workers/register", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Registration successful");
      setFormData(initialFormData);
      setSelectedCategory("");
      setSubCategories([]);
      setErrorMessage("");
      setStep(1);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="register-section" ref={formRef}>
      <div className="form-container">
        <div className="form-header">
          <h1>Create Your Account</h1>
          <p>Please fill in your personal details to get started with our platform.</p>
          <div className="steps">
            <div className={`step ${step >= 1 ? "active" : ""}`}>
              <span>①</span> Personal Details
            </div>
            <div className={`step ${step >= 2 ? "active" : ""}`}>
              <span>②</span> Work Details
            </div>
          </div>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          {step === 1 && (
            <div className="form-content">
              
              <div className="section-title">
              <span className="material-symbols-outlined">person</span>
               Basic Information</div>

              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="e.g. Shailesh"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="e.g. Patel"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>



                 <div className="section-title"> 
                  <span className="material-symbols-outlined">mail</span>Contact & Identification</div>

<div className="form-grid">
  <div className="form-group">
    <label>Mobile Number</label>
    <div className="input-with-prefix">
      <span>+91</span>
      <input
        type="text"
        name="phone"
        placeholder="9265353224"
        value={formData.phone}
        onChange={handleChange}
        maxLength={10}
      />
    </div>
  </div>

  <div className="form-group">
    <label>Email Address</label>
    <input
      type="email"
      name="email"
      placeholder="xyz@gmail.com"
      value={formData.email}
      onChange={handleChange}
    />
  </div>
</div>


<div className="form-grid">
  <div className="form-group">
    <label>Aadhaar Number</label>
    <input
      type="text"
      name="aadhar"
      placeholder="XXXX-XXXX-XXXX"
      value={formData.aadhar}
      onChange={handleChange}
      maxLength={12}
    />
  </div>

    <div className="form-group">
    <label>Profile Image</label>
    <input
      type="file"
      name="file"
      onChange={handleChange}
      accept="image/*"       
    />
  </div>
</div>
              <div className="section-title">
      <span className="material-symbols-outlined">location_on</span>Address Details
             </div>

              <div className="form-group full-width">
                <label>Your Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Street name, House number, Building"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Pin Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="123456"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <select name="city" value={formData.city} onChange={handleChange}>
                    <option value="">Select city</option>
                    <option value="surat">Surat</option>
                    <option value="ahmedabad">Ahmedabad</option>
                    <option value="vadodara">Vadodara</option>
                    <option value="bhavnagar">Bhavnagar</option>
                    <option value="rajkot">Rajkot</option>
                  </select>
                </div>
              </div>

              <div className="section-title"> <span className="material-symbols-outlined">lock</span>Security</div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Create Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="button-group">
                <button type="button" className="btn secondary">
                  Cancel
                </button>
                <button type="submit" className="btn primary">
                  Next Step
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-content">
              <div className="section-title">Work Details</div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={selectedCategory} onChange={handleCategoryChange} required>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Sub-category</label>
                  <select name="subCategory" value={formData.subCategory} onChange={handleChange} required>
                    <option value="">Select Sub-category</option>
                    {subCategories.map((sub, index) => (
                      <option key={index} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Time period</label>
                  <select name="desiredPeriod" value={formData.desiredPeriod} onChange={handleChange} required>
                    <option value="">Select hours</option>
                    <option value="flexible hour">Flexible</option>
                    <option value="1 hour">1 hour</option>
                    <option value="2 hour">2 hour</option>
                    <option value="more than 2">more than 2</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Hourly pay</label>
                  <input
                    type="text"
                    name="hourlyPay"
                    placeholder="'x' Rupees/hour"
                    value={formData.hourlyPay}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Details about your work</label>
                  <textarea
                    name="workerDetails"
                    placeholder="More information about your work..."
                    value={formData.workerDetails}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Work Experience</label>
                  <input
                    type="text"
                    name="workExperience"
                    placeholder="In years"
                    value={formData.workExperience}
                    onChange={handleChange}
                    required
                  />
                
                </div>
              </div>

              <div className="terms-checkbox">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                />
                <label htmlFor="termsAccepted">I accept terms and conditions of look for worker</label>
              </div>

              <div className="button-group">
                <button type="button" className="btn secondary" onClick={() => setStep(1)}>
                  Back
                </button>
                <button type="submit" className="btn primary" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Details"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};