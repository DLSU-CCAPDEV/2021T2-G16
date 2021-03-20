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

  renderStyle = ({
    primary,
    color,
    backgroundColor,
    hoverColor,
    hoverBackgroundColor,
  }) => {
    let style;

    if (primary) {
      return { backgroundColor, color };
    } else {
      return { border: "1px solid " + primary ? backgroundColor : color };
    }
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
