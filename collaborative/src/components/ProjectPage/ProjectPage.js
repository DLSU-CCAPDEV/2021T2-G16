import React from "react";
import TrelloBoard from "react-trello";
import { connect } from "react-redux";
import styles from "./ProjectPage.module.css";

const data = {
  lanes: [
    {
      id: "lane1",
      title: "Planned Tasks",
      label: "2/2",
      cards: [
        {
          id: "Card1",
          title: "Write Blog",
          description: "Can AI make memes",
          label: "30 mins",
          draggable: false,
        },
        {
          id: "Card2",
          title: "Pay Rent",
          description: "Transfer via NEFT",
          label: "5 mins",
          metadata: { sha: "be312a1" },
        },
      ],
    },
    {
      id: "lane2",
      title: "Completed",
      label: "0/0",
      cards: [],
    },
  ],
};

// TODO check if it is possible to attach a CSS sheet to an inline-style
const ProjectPage = ({ projectItems }) => {
  return (
    <section>
      <TrelloBoard
        data={data}
        draggable
        editable
        canAddLanes
        editLaneTitle
        style={{ backgroundColor: "#F6F8F9" }}
        cardStyle={{ backgroundColor: "white", borderRadius: "5px" }}
        laneStyle={{}}
        components={
          {
            // NewLaneSection: () => {},
          }
        }
      />
    </section>
  );
};

const mapStateToProps = (state) => {
  const { projectReducer, currentUserReducer } = state;

  return {
    projectItems: projectReducer.filter(
      (item) => item.uniqueID === currentUserReducer.uniqueID
    ),
  };
};

export default connect(mapStateToProps)(ProjectPage);
