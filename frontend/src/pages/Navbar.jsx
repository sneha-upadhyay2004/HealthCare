

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // adjust path as needed

const Navbar = () => {
  const { user, token, logout } = useContext(AuthContext);

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>HealthCare SOS</h2>
      <div>
        {!token && (
          <>
            <Link to="/register" style={styles.link}>Register</Link>
            <Link to="/login" style={styles.link}>Login</Link>
          </>
        )}

        {token && (
          <>
            <Link to="/hospital" style={styles.link}>Hospitals</Link>
            <Link to="/emergencies" style={styles.link}>Emergencies</Link>
             <Link to="/call" style={styles.link}>call</Link>
            <button onClick={logout} style={styles.logoutBtn}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#2196F3",
    color: "#fff",
    alignItems: "center",
  },
  logo: {
    margin: 0,
  },
  link: {
    marginLeft: "15px",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  logoutBtn: {
    marginLeft: "15px",
    backgroundColor: "transparent",
    border: "none",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Navbar;
