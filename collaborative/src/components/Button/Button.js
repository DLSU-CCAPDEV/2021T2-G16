import React, { useState } from "react";
import styles from "./Button.module.css";
import { Link } from "react-router-dom";

const Button = ({
  backgroundColor = "white",
  color = "black",
  primary,
  bold,
  children,
  smooth,
  fontSize = "16",
}) => {
  const [isHoveredOn, toggleHover] = useState(false);

  const renderStyle = () => {
    let Color = require("color");
    let primaryColor = Color(backgroundColor);
    let darkenedPrimaryColor = primaryColor.darken(0.08);
    let style = {};

    if (primary) {
      style = {
        backgroundColor: isHoveredOn ? darkenedPrimaryColor : primaryColor,
        color: color,
      };
    } else {
      style = {
        backgroundColor: isHoveredOn ? color : "transparent",
        color: isHoveredOn ? "black" : color,
      };
    }

    style.border = `1px solid ${
      isHoveredOn && primary ? darkenedPrimaryColor : primaryColor
    }`;

    style.fontWeight = bold ? "700" : "500";
    style.borderRadius = smooth ? "50px" : "5px";
    style.fontSize = fontSize + "px";

    return style;
  };

  const renderElement = () => {
    if (children.type === Link) {
      return (
        <Link
          to={children.props.to}
          onMouseEnter={() => toggleHover(true)}
          onMouseLeave={() => toggleHover(false)}
          className={styles.Button}
          style={renderStyle()}
        >
          {children.props.children}
        </Link>
      );
    } else {
      return (
        <div
          onMouseEnter={() => toggleHover(true)}
          onMouseLeave={() => toggleHover(false)}
          className={styles.Button}
          style={renderStyle()}
        >
          {children}
        </div>
      );
    }
  };

  return renderElement();
};

export default Button;
