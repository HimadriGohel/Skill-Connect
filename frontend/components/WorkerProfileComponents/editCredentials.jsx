import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../WorkerProfileComponents/workerProfileCss.css'


const ChangeEmailAndPassword = () => {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setMessage("New password and confirmation password do not match!");
            return;
        }

        try {
            setLoading(true);

            // Prepare the data for the backend
            const dataToUpdate = {
                oldPassword: formData.oldPassword, // Old password (only if changing password)
                newPassword: formData.newPassword

                // ...(formData.oldPassword && { oldPassword: formData.oldPassword }),
                // ...(formData.newPassword && { newPassword: formData.newPassword }), 
            };

            const response = await axios.post(
                "http://localhost:8000/api/v1/workers/editworkerCredentials",
                dataToUpdate,
                { withCredentials: true }
            );

            setMessage(response.data.message || "Details updated successfully!");
            setFormData((prev) => ({
                ...prev,
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            }));

            setTimeout(() => {
                navigate("/workerProfile");
            }, 2000);
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Please Enter valid old password"
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="tab-pane" id="editcredentials">
            {message && <p className="message" style={{ color: "red" }}>{message}</p>}
            {/* <h2>Change Email and Password</h2> */}
            <form onSubmit={handleSubmit}>
          
                <div className="form-group row">
                    <label htmlFor="oldPassword" className="col-sm-2 col-form-label">
                        Old Password
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="newPassword" className="col-sm-2 col-form-label">
                        New Password
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="confirmPassword" className="col-sm-2 col-form-label">
                        Confirm Password
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="offset-sm-2 col-sm-10">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? "Submitting..." : "Update"}
                        </button>
                    </div>
                </div>
            </form>

            {/* {message && <p className="message">{message}</p>} */}
        </div>
    );
};

export default ChangeEmailAndPassword;
