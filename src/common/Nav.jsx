import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Nav = () => {

    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedIn");
        window.location.href = "/login";
    }

  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Easy Learning</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                </ul>
                <span className="navbar-text">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        {/* If logged in then show logout button*/}

                        {loggedIn && (
                            <li className="nav-item">
                                <Link className="nav-link" onClick={logout}>Logout</Link>
                            </li>
                        )}

                        {/* If not logged in then show login and register buttons
                         */}

                        {!loggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </span>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Nav;