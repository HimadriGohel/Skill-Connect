import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate here
import axios from 'axios'; // Make sure axios is imported
import Navlogo from '../../components/assets/logo.png';
import { API } from '../../src/api/axios';

function WorkerProfileNavbar({ registrationFormRef }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            setLoading(true); // Start loading spinner

            // Logout request
            const response = await API.post(
                '/workers/logout',
                {}, // Empty body for POST request
                { withCredentials: true } // Send cookies with the request
            );

            if (response.data.success) {
                navigate('/'); // Redirect to home after successful logout
            } else {
                setError('Logout failed. Please try again.');
            }
        } catch (error) {
            setError('Failed to log out. Please try again.'); // Catch error in case of failure
        } finally {
            setLoading(false); // Stop loading spinner after response
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="worker-profile-container">
                    <a href="/" className="logo-image">
                        <img src={Navlogo} alt="Look for Worker Logo" />
                    </a>
                    <div className="nav-links" id="nav-links">
                        <ul className="flex">
                            <li>
                                <NavLink
                                    to="/"
                                    className="hover-links"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/workerprofile"
                                    className="hover-links active-link"
                                >
                                    Worker Profile
                                </NavLink>
                            </li>
                            <li>
                                <button
                                    className="hover-links primary-btn"
                                    onClick={handleLogout} // Trigger logout on click
                                    disabled={loading} // Disable button while loading
                                >
                                    {loading ? "logging out..." : 'Logout'} {/* Display message while logging out */}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {error && <div className="error-message">{error}</div>} {/* Display error message if logout fails */}
        </>
    );
}

export default WorkerProfileNavbar;
