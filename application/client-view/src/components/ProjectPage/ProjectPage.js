import React, { useEffect, useState } from "react";
import TrelloBoard from "react-trello";
import styles from "./ProjectPage.module.css";
import { useParams } from "react-router";

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
      {
        id: "lane2",
        title: "Demo",
        label: "2/2",
        cards: [
          {
            id: "Card3",
            title: "Prepare false data",
            description:
              "It has to make sense and not that damned copy-pasta text.",
            label: "2 hours?",
          },
          {
            id: "Card4",
            title: "Last minute fixes",
            description:
              "Better to throw your whole project to the ground by making some last-minute, untested 'fixes' to your work!",
            label: "1 minute",
          },
        ],
      },
      {
        id: "lane2",
        title: "Next Unit Test",
        label: "1/1",
        cards: [
          {
            id: "Card5",
            title: "Test your projects",
            description:
              "Check every nook & cranny of your project to make sure everything works as planned",
          },
        ],
      },
    ],
};

// TODO check if it is possible to attach a CSS sheet to an inline-style
const ProjectPage = ({ project }) => {
  const { slug } = useParams();

  // useEffect(async () => {
  // const queryString = new URLSearchParams({ username }).toString();
  // await axios.post("/api/userProfile/get", queryString).then((res) => {
  //   setData(res.data);
  // });
  // });

  return (
    <section className={styles.ProjectPage}>
      <TrelloBoard
        data={data}
        draggable
        cardDraggable
        laneDraggable
        editable
        canAddLanes
        editLaneTitle
        style={{
          backgroundColor: "#F6F8F9",
          overflow: "auto",
          overflowY: "hidden",
        }}
        cardStyle={{
          backgroundColor: "white",
          borderRadius: "5px",
          maxWidth: "100wh",
        }}
        laneStyle={{}}
        components={
          {
            // NewLaneSection: () => {},
          }
        }
      />
    </section>
  );

  // : (
  //   <div className={styles.UserProfilePage_Loader}>
  //     <Loader type="Oval" color="gainsboro" height={200} width={200} />
  //   </div>
  // );
};

export default ProjectPage;
