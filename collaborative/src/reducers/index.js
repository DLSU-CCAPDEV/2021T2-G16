import { combineReducers } from "redux";
import { isEqual } from "lodash";
import {
  userDatabaseInject,
  projectDatabaseInject,
  taskDatabseInject,
} from "./DataInjection";

const userReducer = (userDatabase = userDatabaseInject, action) => {
  switch (action.type) {
    case "USER_REGISTRATION":
      const highestID = Math.max.apply(
        Math,
        userDatabase.map(function (item) {
          return item.uniqueID;
        })
      );

      const newUniqueID = highestID + 1;

      action.payload.uniqueID = newUniqueID;

      return [...userDatabase, action.payload];
    default:
      return userDatabase;
  }
};

//  TODO Before production, remove test User
const currentUserReducer = (currentUser = userDatabaseInject[0], action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return action.payload;
    case "USER_LOGOUT":
      console.log("Reached");
      return null;
    default:
      return currentUser;
  }
};

const projectReducer = (
  projectDatabaseReducer = projectDatabaseInject,
  action
) => {
  switch (action.type) {
    case "PROJECT_CREATE":
      return [...projectDatabaseReducer, action.payload];
    default:
      return projectDatabaseReducer;
  }
};

const taskReducer = (taskDatabaseReducer = taskDatabseInject, action) => {
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
  currentUserReducer,
  projectReducer,
  taskReducer,
  userReducer,
});
