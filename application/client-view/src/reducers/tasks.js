const initialState = {
  loading: false,
  tasks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "TASK_FETCH_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "TASK_FETCH_SUCCESS": {
      return {
        loading: false,
        tasks: action.payload,
      };
    }
    case "TASK_CREATE": {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    }
    case "TASK_UPDATE": {
      const { taskName, oldTaskName, taskDescription, taskPriority } =
        action.payload;

      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.taskName === oldTaskName
            ? {
                ...task,
                taskName: taskName,
                taskDescription: taskDescription,
                taskPriority: taskPriority,
              }
            : task
        ),
      };
    }
    case "TASK_DELETE": {
      const { taskName, taskDescription, taskPriority } = action.payload;

      return {
        ...state,
        tasks: state.tasks.filter(
          (task) =>
            !(
              task.taskName === taskName &&
              task.taskDescription === taskDescription &&
              task.taskPriority === taskPriority
            )
        ),
      };
    }
    default:
      return state;
  }
};
