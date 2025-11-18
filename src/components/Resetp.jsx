import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import axios from "axios";

const Resetp = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // validate form
    const validate = () => {
        const newErrors = {};

        // password
        if(password.trim() === ""){
            newErrors.password = "Password is required";
        }
        else if(password.length < 8){
            newErrors.password = "Password should be at least 8 characters long";
        }

        // confirm password
        if(confirmPassword.trim() === ""){
            newErrors.confirmPassword = "Confirm password is required";
        }
        else if(confirmPassword.length < 8){
            newErrors.confirmPassword = "Confirm password should be at least 8 characters long";
        }
        else if(confirmPassword !== password){
            newErrors.confirmPassword = "Passwords do not match";
        }
        
        setErrors(newErrors);
        
        return Object.keys(newErrors).length === 0;
    }

    // handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitted successfully");
      
      if(validate()){
          // submit form
          console.log("success validation");
          
          setIsLoading(true);

          // url decode the token and email from the url
          // in token do not get the string after  &
          var token = window.location.href.split("=")[1];
          token = token.replace("&email", "");
          const email = decodeURIComponent(window.location.href.split("=")[2]);

          // submit the form and redirect to login page
          axios.post("/reset-password", {
              password: password,
              password_confirmation: confirmPassword,
              token: token,
              email: email,
          })
         .then(response => {
              console.log(response);
              setIsLoading(false);
              alert("Password reset successfully. Please login with your new password.");
              window.location.href = "/login";
         })
         .catch(error => {
              setIsLoading(false);
              console.log(error.response.data);
              alert("Error resetting password. Please try again later.");
         });
      }
    };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h3 className="text-center mb-4">Reset Password</h3>

        <form id="registerForm" noValidate onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <input
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter password"
              required
              minLength="6"
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirmPassword"
              placeholder="Re-enter password"
              required
            />
            {errors.confirmPassword && ( <div className="text-danger">{errors.confirmPassword}</div>)}
          </div>

          <button type="submit" className="btn btn-light w-100" disabled={isLoading}>
            {isLoading ? (
                <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Loading...
                </>
            ) : (
                "Reset Password"
            )}
          </button>

          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}
            <Link to="/login" className="fw-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Resetp;
