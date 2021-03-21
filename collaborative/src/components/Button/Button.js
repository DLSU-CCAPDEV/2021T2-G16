import React from "react";
import styles from "./Button.module.css";
import { Link } from "react-router-dom";

class Button extends React.Component {
  static defaultProps = {
    backgroundColor: "white",
    color: "black",
    hoverColor: "gray",
  };

  state = { hoveredOn: false };

  toggleHover = () => {
    this.setState({ hoveredOn: !this.state.hoveredOn });
  };

  renderStyle = ({ primary, color, backgroundColor, bold }) => {
    let Color = require("color");
    let primaryColor = Color(backgroundColor);
    let darkenedPrimaryColor = primaryColor.darken(0.08);
    let style = {};

    if (primary) {
      style = {
        backgroundColor: this.state.hoveredOn
          ? darkenedPrimaryColor
          : primaryColor,
        color: color,
      };
    } else {
      style = {
        backgroundColor: this.state.hoveredOn ? color : "transparent",
        color: this.state.hoveredOn ? "black" : color,
      };
    }

    //  Apply Border to all
    style.border = `1px solid ${
      this.state.hoveredOn && primary ? darkenedPrimaryColor : primaryColor
    }`;
    style.fontWeight = bold ? "700" : "500";

    return style;
  };

  render() {
    if (this.props.Link) {
      return (
        <Link
          to={"/" + this.props.linkTo}
          onMouseEnter={this.toggleHover}
          onMouseLeave={this.toggleHover}
          className={styles.Button}
          style={this.renderStyle(this.props)}
        >
          {this.props.children}
        </Link>
      );
    } else {
      return <a>{this.props.text}</a>;
    }
  }
}

export default Button;
