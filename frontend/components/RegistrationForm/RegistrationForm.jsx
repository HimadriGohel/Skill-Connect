import React, { useState, useEffect } from "react";
import { API } from "../../src/api/axios";
import "./RegistrationFrom.css";
import axios from "axios";

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
    // Fetch categories from backend when component mounts
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
    const selectedCat = categories.find(category => category._id === selectedCategoryId);
    setFormData((prevData) => ({
      ...prevData,
      category: selectedCat ? selectedCat.category : "",  // Store category name
      subCategory: "", // Reset subcategory
    }));
    setSubCategories([]);

    // Fetch subcategories based on selected category
    try {
      const response = await API.get(`/subCategory/getSubCategories/${selectedCategoryId}`);
      if (response.data.length > 0) {
        setSubCategories(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
      setTimeout(handleCategoryChange, 2000);
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


  // Add a function specifically for step 1 validation
const validateStep1 = () => {
  const { firstName, lastName, phone, email, address, aadhar, file, password, confirmPassword, postalCode, city } = formData;

  if (!firstName || !lastName || !phone || !email || !address || !aadhar || !file || !password || !confirmPassword || !postalCode || !city) {
    alert("Please fill in all personal details.");
    return false;
  }

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  // Validate password match
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }

  // Validate phone number
  const phonePattern = /^\d{10}$/;
  if (!phonePattern.test(phone)) {
    alert("Phone number must be exactly 10 digits.");
    return false;
  }

  // Validate Aadhaar
  const aadharPattern = /^\d{12}$/;
  if (!aadharPattern.test(aadhar)) {
    alert("Aadhaar number must be exactly 12 digits.");
    return false;
  }

  return true;
};

  const validateForm = () => {
    const {
      firstName,
      lastName,
      phone,
      email,
      aadhar,
      password,
      confirmPassword,
      workExperience,
      postalCode,
      city,
      file,
      address,
      termsAccepted,
    } = formData;

    if (!firstName || !lastName || !phone || !email || !aadhar || !password || !confirmPassword || !workExperience || !postalCode || !city || !address || !file) {
      alert("Please fill in all fields.");
      return false;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    // Validate password match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }

    // Check if terms are accepted
    if (!termsAccepted) {
      alert("You must accept the terms and conditions.");
      return false;
    }
    // Validate phone number length and numeric-only input
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
      alert("Phone number must be exactly 10 digits and numeric.");
      return false;
    }
    // Validate Aadhaar number length and numeric-only input
    const aadharPattern = /^\d{12}$/;
    if (!aadharPattern.test(aadhar)) {
      alert("Aadhaar number must be exactly 12 digits and numeric.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const form = new FormData();

    for (const key in formData) {
      form.append(key, formData[key]);
    }
    setIsLoading(true);
    try {
      const res = await API.post("/workers/register", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      alert("Registration successful");
      setFormData(initialFormData);
      setSelectedCategory("");
      setSubCategories([]);
      setErrorMessage("");
    } catch (err) {
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data.message || "Registration failed. Please try again.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (


    <section className="register-section" ref={formRef}>
      <div className="container">
        <form className="register-form" onSubmit={handleSubmit}>
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          {step === 1 && (
            <>
          <span className="work" style={{fontSize:"20px"}}>Personal Details:</span>
          <div className="form-row flex">
            <div className="firstname">
              <div className="small-bold-text size">First name</div>
              <input
                type="text"
                className="third-row-select-box"
                name="firstName"
                placeholder="shailesh"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="lastname">
              <div className="small-bold-text size">Last name</div>
              <input
                type="text"
                className="third-row-select-box"
                name="lastName"
                placeholder="patel"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row flex">
            <div className="phone">
              <div className="small-bold-text size">Mobile Number</div>
              <input
                type="text"
                className="third-row-select-box"
                name="phone"
                placeholder="9265353224"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="email">
              <div className="small-bold-text size">E-mail</div>
              <input
                type="text"
                className="third-row-select-box"
                name="email"
                placeholder="xyz@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="address">
              <div className="small-bold-text size">Your address</div>
              <input
                type="text"
                className="category-select-box1"
                name="address"
                placeholder="street, house-number"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row flex">
            <div className="aadhar">
              <div className="small-bold-text size">Aadhar number</div>
              <input
                type="text"
                className="third-row-select-box"
                placeholder="xxxx"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleChange}
                required
              />
            </div>
          <div className="other-details second-row-common">
              <div className="small-bold-text size">Profile Image</div>
              <input
                name="file"
                type="file"
                id="desc"
                className="category-select-box uploader"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row flex">
            <div className="password">
              <div className="small-bold-text size">Create Password</div>
              <input
                type="password"
                id="passwords"
                className="third-row-select-box"
                placeholder="Create password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="confirm_password">
              <div className="small-bold-text size">Confirm Password</div>
              <input
                type="password"
                id="confirm_pass"
                className="third-row-select-box"
                placeholder="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="postal-code">
              <div className="small-bold-text size">Pin code</div>
              <input
                type="text"
                className="category-select-box"
                name="postalCode"
                placeholder="1234"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
            <div className="city" style={{ position: "relative" }}>
              <div className="small-bold-text size">City</div>
              <select type="text" className="category-select-box" name="city"
                value={formData.city}
                onChange={handleChange} required>
                <option value="city">Select city</option>
                <option value="surat">Surat</option>
                <option value="ahmedabad">Ahmedabad</option>
                <option value="vadodara">Vadodara</option>
                <option value="bhavnagar">Bhavnagar</option>
                <option value="rajkot">Rajkot</option>
              </select>
              
            <div className="button-container">
               <button
               type="button"
               className="primary-btn"
               onClick={() => {
                if (validateStep1()) {
               setStep(2); // Only go to step 2 if step1 is valid
               }
               }}> Next
  </button>
              </div>   
            </div>
              
          </div>
          </>
            )}


          {step === 2  && (
         <>
          <span className="work">Work Details:</span>
           <div className="form-row flex">
            <div className="category first-row-common">
              <div className="small-bold-text size">Category</div>
              <select
                className="category-select-box"
                name="category"
                required
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.category}
                  </option>
                ))}
              </select>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1rem"
                fill="grey"
                className="down-caret"
                viewBox="0 0 448 512"
              >
                <path d="M207.029 381.476L12.686 187.138c-8.012-8.01-8.012-20.981 0-28.993l28.284-28.284c8.012-8.012 20.981-8.012 28.993 0L224 292.515l154.036-154.036c8.012-8.012 20.981-8.012 28.993 0l28.284 28.284c8.012 8.012 8.012 20.981 0 28.993L240.971 381.476c-8.013 8.012-20.982 8.012-28.993 0z" />
              </svg> */}
            </div>
            <div className="category sub-category first-row-common">
              <div className="small-bold-text size">Sub-category</div>
              <select
                className="category-select-box"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
              >
                <option value="">Select Sub-category</option>
                {subCategories.map((subCategory, index) => (
                  <option key={index} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1rem"
                fill="grey"
                className="down-caret"
                viewBox="0 0 448 512"
              >
                <path d="M207.029 381.476L12.686 187.138c-8.012-8.01-8.012-20.981 0-28.993l28.284-28.284c8.012-8.012 20.981-8.012 28.993 0L224 292.515l154.036-154.036c8.012-8.012 20.981-8.012 28.993 0l28.284 28.284c8.012 8.012 8.012 20.981 0 28.993L240.971 381.476c-8.013 8.012-20.982 8.012-28.993 0z" />
              </svg> */}
            </div>
          </div>
          <div className="form-row flex">
            <div className="desired-period first-row-common">
              <div className="small-bold-text size">Time period</div>
              <select
                className="period-select"
                name="desiredPeriod"
                placeholder="In hours"
                required
                value={formData.desiredPeriod}
                onChange={handleChange}
              >
                <option value="">Select hours</option>
                <option value="flexible hour">Flexible</option>
                <option value="1 hour">1 hour</option>
                <option value="2 hour">2 hour</option>
                <option value="more than 2">more than 2</option>
              </select>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1rem"
                fill="grey"
                className="down-caret absolute"
                viewBox="0 0 448 512"
              >
                <path d="M207.029 381.476L12.686 187.138c-8.012-8.01-8.012-20.981 0-28.993l28.284-28.284c8.012-8.012 20.981-8.012 28.993 0L224 292.515l154.036-154.036c8.012-8.012 20.981-8.012 28.993 0l28.284 28.284c8.012 8.012 8.012 20.981 0 28.993L240.971 381.476c-8.013 8.012-20.982 8.012-28.993 0z" />
              </svg> */}
            </div>
            <div className="pay-rate first-row-common">
              <div className="small-bold-text size">Hourly pay</div>
              <input
                type="text"
                className="pay-select-box"
                name="hourlyPay"
                placeholder="'x' Rupees/hour"
                required
                value={formData.hourlyPay}
                onChange={handleChange}
              />
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1rem"
                fill="grey"
                className="down-caret"
                viewBox="0 0 448 512"
              >
                <path d="M207.029 381.476L12.686 187.138c-8.012-8.01-8.012-20.981 0-28.993l28.284-28.284c8.012-8.012 20.981-8.012 28.993 0L224 292.515l154.036-154.036c8.012-8.012 20.981-8.012 28.993 0l28.284 28.284c8.012 8.012 8.012 20.981 0 28.993L240.971 381.476c-8.013 8.012-20.982 8.012-28.993 0z" />
              </svg> */}
            </div>
          </div>
          <div className="form-row flex">
            <div className="other-details second-row-common">
              <div className="small-bold-text size">
                Details about your work
              </div>
              <textarea
                name="workerDetails"
                id="desc"
                className="category-select-box"
                cols="30"
                rows="10"
                placeholder="More information about your work..."
                value={formData.workerDetails}
                onChange={handleChange}
              />
            </div>
              <div className="Work_experience">
              <div className="small-bold-text size">Work Experience</div>
              <input
                type="text"
                className="third-row-select-box"
                placeholder="In years"
                name="workExperience"
                value={formData.workExperience}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="terms">
            <div className="left-part flex">
              <input
                type="checkbox"
                name="termsAccepted"
                id="terms"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              <div className="small-bold-text">
                <label htmlFor="terms" style={{ cursor: "pointer" }}>
                  I accept terms and conditions of look for worker
                </label>
              </div>
            </div>
          </div>
          {/* <div className="button-container">
            <button type="submit" className="primary-btn" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Details"}
            </button>
          </div> */}

          <div className="button-container">
                <button type="button" className="primary-btn" onClick={() => setStep(1)}>Back</button>
                <button type="submit" className="primary-btn" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Details"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
};