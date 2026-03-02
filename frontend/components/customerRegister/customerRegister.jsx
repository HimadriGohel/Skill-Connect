import React, { useState } from 'react';
import axios from 'axios';
import '../customerRegister/customerRegister.css';
import { API } from '../../src/api/axios';

const RegisterPopup = ({ toggleForm }) => {
    const [registerFullname, setRegisterFullname] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPhone, setRegisterPhone] = useState('');
    const [registerAddress, setRegisterAddress] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
    const [fieldErrors, setFieldErrors] = useState({
        fullname: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
        terms: '',
    });

    const handleRegister = async () => {
        let isValid = true;
        const newFieldErrors = { ...fieldErrors };

        // Validation logic...
        if (!registerFullname.trim()) {
            newFieldErrors.fullname = 'Fullname is required';
            isValid = false;
        } else {
            newFieldErrors.fullname = '';
        }

        if (!registerEmail.trim()) {
            newFieldErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail)) {
            newFieldErrors.email = 'Invalid email format';
            isValid = false;
        } else {
            newFieldErrors.email = '';
        }

        if (!registerPhone.trim()) {
            newFieldErrors.phone = 'Phone number is required';
            isValid = false;
        } else if (!/^\d{10}$/.test(registerPhone)) {
            newFieldErrors.phone = 'Phone number must be 10 digits';
            isValid = false;
        } else {
            newFieldErrors.phone = '';
        }

        if (!registerAddress.trim()) {
            newFieldErrors.address = 'Address is required';
            isValid = false;
        } else {
            newFieldErrors.address = '';
        }

        if (!registerPassword) {
            newFieldErrors.password = 'Password is required';
            isValid = false;
        } else if (registerPassword.length < 6) {
            newFieldErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        } else {
            newFieldErrors.password = '';
        }

        if (!registerConfirmPassword) {
            newFieldErrors.confirmPassword = 'Confirm password is required';
            isValid = false;
        } else if (registerPassword !== registerConfirmPassword) {
            newFieldErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        } else {
            newFieldErrors.confirmPassword = '';
        }

        if (!acceptTerms) {
            newFieldErrors.terms = 'You must accept the terms and conditions';
            isValid = false;
        } else {
            newFieldErrors.terms = '';
        }

        setFieldErrors(newFieldErrors);

        if (!isValid) return;

        try {
            const response = await API.post(
                '/user/registerUser',
                {
                    fullName: registerFullname,
                    email: registerEmail,
                    phone: registerPhone,
                    address: registerAddress,
                    password: registerPassword,
                },
                { withCredentials: true }
            );

            if (response.status === 201) {
                console.log(response.data);
                window.location.reload();
            }
        } catch (error) {
            if (error.response) {
                // Check for specific error status or message from the backend
                if (error.response.status === 409 || error.response.data.message === 'user with email is already exist') {
                    alert('Existing user. Please try to login instead.');
                } else if (error.response.status === 400) {
                    alert(error.response.data.message); // For other validation errors
                }
            } else {
                console.error('Registration failed:', error.message);
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-info">
                <div className="small-bold-text red">Note: *This is for customers only</div>
                <div className="customer-login-form flex scrollable-form">
                    <div className="common">
                        <input
                            type="text"
                            className="account-fname login-email"
                            placeholder="Fullname"
                            required
                            value={registerFullname}
                            onChange={(e) => setRegisterFullname(e.target.value)}
                        />
                        {fieldErrors.fullname && <p className="customer-register-error">{fieldErrors.fullname}</p>}
                    </div>

                    <div className="common">
                        <input
                            type="email"
                            className="login-email"
                            placeholder="Enter email address"
                            required
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                        />
                        {fieldErrors.email && <p className="customer-register-error">{fieldErrors.email}</p>}
                    </div>

                    <div className="common">
                        <input
                            type="text"
                            className="phone login-email"
                            placeholder="Enter Phone number"
                            required
                            value={registerPhone}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value) && value.length <= 10) {
                                    setRegisterPhone(value);
                                }
                            }}
                        />
                        {fieldErrors.phone && <p className="customer-register-error">{fieldErrors.phone}</p>}
                    </div>

                    <div className="common">
                        <input
                            type="text"
                            className="login-email address"
                            placeholder="Enter Your address"
                            required
                            value={registerAddress}
                            onChange={(e) => setRegisterAddress(e.target.value)}
                        />
                        {fieldErrors.address && <p className="customer-register-error">{fieldErrors.address}</p>}
                    </div>

                    <div className="common">
                        <input
                            type="password"
                            value={registerPassword}
                            className="login-email"
                            required
                            placeholder="Create password"
                            onChange={(e) => setRegisterPassword(e.target.value)}
                        />
                        {fieldErrors.password && <p className="customer-register-error">{fieldErrors.password}</p>}
                    </div>

                    <div className="common">
                        <input
                            type="password"
                            value={registerConfirmPassword}
                            className="login-email"
                            required
                            placeholder="Confirm password"
                            onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        />
                        {fieldErrors.confirmPassword && <p className="customer-register-error">{fieldErrors.confirmPassword}</p>}
                    </div>
                </div>

                <div className="small-bold-text conditions" style={{ gap: '5px' }}>
                    <div className="condition-flex flex" style={{ gap: '10px' }}>
                        <input
                            type="checkbox"
                            name="new-account-condition"
                            id="new-account-condition"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                        />
                        <label htmlFor="new-account-condition" style={{ cursor: 'pointer' }}>
                            I accept terms and conditions of look for worker
                        </label>
                    </div>
                    {fieldErrors.terms && <p className="customer-register-error">{fieldErrors.terms}</p>}
                </div>

                <button className="primary-btn login-btn" onClick={handleRegister} style={{ marginTop: '15px' }}>
                    Proceed
                </button>
            </div>
        </div>
    );
};

export default RegisterPopup;
