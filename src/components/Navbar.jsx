import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JagaEyes from "./JagaEyes";
import styles from "../styles/Navbar.module.css";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <JagaEyes />
        <h1 onClick={() => navigate("/")} className={styles.haribolTitle}>
          Hari Bol!
        </h1>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <a href="#about">About</a>
        </li>
        <li
          className={styles.dropdown}
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <button className={styles.dropdownBtn}>
            Festivals <span className={styles.arrow}>▼</span>
          </button>
          {dropdownOpen && (
            <ul className={styles.dropdownMenu}>
              <li>
                <a href="#rathyatra">Rath Yatra</a>
              </li>
              <li>
                <a href="#snanayatra">Snana Yatra</a>
              </li>
              <li>
                <a href="#chandan-yatra">Chandan Yatra</a>
              </li>
              {/* Add more festivals as needed */}
            </ul>
          )}
        </li>
        <li>
          <a href="#significance">Significance</a>
        </li>
        <li>
          <a href="#history">History</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
