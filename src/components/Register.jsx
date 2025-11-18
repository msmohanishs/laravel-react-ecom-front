import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import axios from "axios";

export const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // validate form
    const validate = () => {
        const newErrors = {};

        // name
        if(name.trim() === ""){
            newErrors.name = "Name is required";
        }
        // add special characters validation
        else if(!/^[a-zA-Z ]+$/.test(name)){
            newErrors.name = "Name should contain only alphabets and spaces";
        }

        // email
        if(email.trim() === ""){
            newErrors.email = "Email is required";
        }
        else if(!/\S+@\S+\.\S+/.test(email)){
            newErrors.email = "Email is invalid";
        }

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
        // console.log("success validation");
        
        setIsLoading(true);
        
        // submit the form and redirect to login page
        axios.post("/register", {
            name: name,
            email: email,
            password: password,
            password_confirmation: confirmPassword
          })
          .then(response => {
              console.log(response);
              setIsLoading(false);
              
              //redirect to login page
              window.location.href = "/login";
          })
          .catch(error => {
             setIsLoading(false);
             alert("Error: " + error.response.data.message);
        });  
      }
    };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h3 className="text-center mb-4">Create Account</h3>

        <form id="registerForm" noValidate onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="Enter your name"
              required
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter email"
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}

          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
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
                "Register"
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
