import React, { useState } from "react";
import { Link, Navigate} from "react-router-dom";
import "./Auth.css";
import axios from "axios";

export const Login = () => {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [message, setMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // validation function
    const validate = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Enter a valid email";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const formSubmit = (e) => {
        e.preventDefault();

        if (validate()) {

            console.log("Login form submitted with:", { email, password });

            setIsLoading(true);

            // Simulate server response
            axios.post('/login', { email, password })
                .then(response => {
                    // setMessage("Login successful!");
                    // console.log(response.data);
                    setLoggedIn(true);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('loggedIn', 'true');
                    setIsLoading(false);

                    // redirect to the dashboard
                    window.location.href = '/profile';
                })
                .catch(error => {
                    setIsLoading(false);
                    alert("Login failed. Please check your credentials.");
                    console.error(error);
            }); 
        }               
    }

    // if logged in, then redirect to profile
    if (loggedIn) {
        return <Navigate to="/profile" replace />;
    }

    return (

        <div className="auth-wrapper">
        <div className="auth-container">
            <h3 className="text-center mb-4">Welcome Back</h3>
            <form id="loginForm" noValidate onSubmit={formSubmit}>

            {/* Email */}
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                Email address
                </label>
                <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="email"
                placeholder="Enter email"
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                Password
                </label>
                <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="password"
                placeholder="Password"
                />
                {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
            </div>

            {/* Remember & Forgot */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                <input type="checkbox" className="form-check-input" id="remember" />
                <label className="form-check-label ms-1" htmlFor="remember">
                    Remember me
                </label>
                </div>
                <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-light w-100" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Loading...
                    </>
                ) : (
                    "Login"
                )}
            </button>

            <p className="text-center mt-3 mb-0">
                Don’t have an account?{" "}
                <Link to="/register" className="fw-bold">
                Register
                </Link>
            </p>
            </form>
        </div>
        </div>
    );
};
             