import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import axios from "axios";

export const Forgot = () => {

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // validate the form
  const validate = () => {
     const newErrors = {};

     if (!email) {
       newErrors.email = "Email is required";
     }
     else if (!/\S+@\S+\.\S+/.test(email)) {
       newErrors.email = "Email is invalid";
     }

     setErrors(newErrors);

     return Object.keys(newErrors).length === 0;
  }

  // submit the form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
        setIsLoading(true);
        axios.post("/forgot-password", { email: email })
            .then((response) => {
                console.log(response);
                setIsLoading(false);
                alert("Reset link has been sent to your email address.");
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error.response.data);
                alert(error.response.data.message);
            });
    }
};

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h3 className="text-center mb-4">Forgot Password</h3>
        <p className="text-center mb-4">
          Enter your email address and we’ll send you a link to reset your password.
        </p>

        <form id="forgotPasswordForm" noValidate onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-light w-100" disabled={isLoading}>
            {isLoading ? (
                <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Loading...
                </>
            ) : (
                "Send Reset Link"
            )}
          </button>

          {/* Back to Login */}
          <p className="text-center mt-3 mb-0">
            Remembered your password?{" "}
            <Link to="/login" className="fw-bold">
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
