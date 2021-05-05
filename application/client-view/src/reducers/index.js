import { combineReducers } from "redux";
import { isEqual } from "lodash";

const projectReducer = (projectDatabaseReducer = [], action) => {
  switch (action.type) {
    case "PROJECT_CREATE":
      return [...projectDatabaseReducer, action.payload];
    default:
      return projectDatabaseReducer;
  }
};

const taskReducer = (taskDatabaseReducer = [], action) => {
  switch (action.type) {
    case "TASK_CREATE":
      return [...taskDatabaseReducer, action.payload];
    case "TASK_DELETE":
      return taskDatabaseReducer.filter(
        (item) => !isEqual(item, action.payload.taskProp)
      );
    default:
      return taskDatabaseReducer;
  }
};

export default combineReducers({
  projectReducer,
  taskReducer,
});
