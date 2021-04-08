import React from "react";
import styles from "./Logo.module.css";
import Logo__White from "../../assets/Logo-White.svg";
import Logo__Color from "../../assets/Logo-Color.svg";

const Logo = ({ primary, justText, fontSize = 40 }) => {
  const scaleFactor = 1.1;

  return (
    <div className={styles.Logo}>
      {!justText && (
        <img
          src={primary ? Logo__Color : Logo__White}
          alt="Collaborative Logo"
          style={{ width: fontSize * scaleFactor + "px", height: "auto" }}
        />
      )}
      <span
        style={{
          color: primary ? "black" : "white",
          fontSize,
        }}
        className={styles.Logo_text}
      >
        Collaborative
      </span>
    </div>
  );
};

export default Logo;
