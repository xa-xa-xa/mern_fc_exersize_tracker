import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const styles = {
    background: {
      backgroundColor: '#8d2a1c'
    },
    text: { color: '#DBCA58' },
    menu: {
      border: '#DBCA58 1px solid'
    }
  };

  return (
    <nav className="navbar navbar-expand-md" style={styles.background}>
      <Link to="" className="navbar-brand h1" style={styles.text}>
        Exercise Tracker
      </Link>
      <button
        className="navbar-toggler navbar-light"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={() => setShowMenu(!showMenu)}
        id="menu-btn"
        style={styles.menu}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`collapse navbar-collapse ${
          showMenu ? 'show text-center' : ''
        }`}
        id="menu"
      >
        <ul className="navbar-nav ml-auto">
          <li className="navbar-item ">
            <Link to="/" className="nav-link text-warning">
              Exercises
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="nav-link text-warning">
              Create Exercise Log
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/user" className="nav-link text-warning">
              Create User
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
