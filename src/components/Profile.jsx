import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import axios from "axios";

export const Profile = () => {

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedIn");
    window.location.href = "/login";
  };

  const [user, setUser] = useState(null);

   useEffect(() => {
      let token = localStorage.getItem("token");

      axios.get('/current-user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        let userData = response.data.user ?? response.data;

        // Add dummy avatar if missing
        if (!userData.avatar) {
          userData.avatar = "https://i.pravatar.cc/120?img=5";
        }

        setUser(userData);   // <<< set the user here
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (!user) {
    return <div>Loading profile...</div>;
  }

  console.log("User data:", user);

  return (
    <div className="auth-wrapper">
      <div className="auth-container text-center">
        {/* Profile Image */}
        <img
          src={user.avatar}
          alt="Profile"
          className="rounded-circle mb-3"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            border: "3px solid #fff",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
          }}
        />

        {/* Name and Email */}
        <h4 className="fw-bold mb-1">{user.name}</h4>
        <p className="mb-4">{user.email}</p>

        {/* Edit / Logout Buttons */}
        <div className="d-grid gap-2">
          <button className="btn btn-light">Edit Profile</button>
          <button className="btn btn-outline-light" onClick={logout}>Logout</button>
        </div>

        {/* Back to Dashboard / Login */}
        <p className="mt-4 mb-0">
          <Link to="/login" className="fw-bold text-white text-decoration-none">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};
