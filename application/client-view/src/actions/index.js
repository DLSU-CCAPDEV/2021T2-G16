export const projectCreate = ({ email, projectName, decsription, members }) => {
  return {
    type: "PROJECT_CREATE",
    payload: {
      email,
      projectName,
      decsription,
      members,
    },
  };
};

export const taskCreate = (
  { taskName, taskDescription, priority },
  { uniqueID }
) => {
  return {
    type: "TASK_CREATE",
    payload: {},
  };
};

export const taskDelete = (taskProp) => {
  return {
    type: "TASK_DELETE",
    payload: {
      taskProp,
    },
  };
};
