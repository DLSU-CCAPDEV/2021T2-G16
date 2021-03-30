import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import stylesWorkspace from "../WorkspaceNavigationBar/WorkspaceNavigationBar.module.css";
import styles from "./OverHeadMessage.module.css";

//  TODO Clickable padding
class OverHeadMessage extends React.Component {
  //  TODO refactor reference
  componentDidMount() {
    document.addEventListener("click", (event) => {
      if (
        $(`.${styles.OverHeadMessage}`).get(0) !== event.target &&
        $(`.${stylesWorkspace.UserPortrait}`).get(0) !== event.target
      ) {
        this.props.closeMenu();
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener("click", null);
  }

  render() {
    return (
      <div
        className={styles.OverHeadMessage}
        style={{ width: this.props.width + "px" }}
      >
        {React.Children.map(this.props.children, (item) => {
          console.table(item);
          if (item.type === Link) {
            return (
              <Link
                className={styles.Item}
                to={item.props.to}
                onClick={item.props.onClick ? () => item.props.onClick() : null}
              >
                {item.props.children}
              </Link>
            );
          } else {
            return item;
          }
        })}
      </div>
    );
  }
}

export default OverHeadMessage;
