import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate here
import axios from 'axios'; // Make sure axios is imported
import Navlogo from '../../components/assets/logo.png';
import { API } from '../../src/api/axios';

function UserPageNav({ }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            setLoading(true);

            // Logout request
            const response = await API.post('/user/logoutUser',
                {},
                { withCredentials: true }
            );

            if (response.data.success) {
                navigate('/');
            } else {
                setError('Logout failed. Please try again.');
            }
        } catch (error) {
            setError('Failed to log out. Please try again.');
        } finally {
            setLoading(false);
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
                                <button
                                    className="hover-links primary-btn"
                                    onClick={logout}
                                    disabled={loading}
                                >
                                    {loading ? "logging out..." : 'Logout'}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {error && <div className="error-message">{error}</div>}
        </>
    );
}

export default UserPageNav;