import { combineReducers } from "redux";
import { userDatabaseInject, projectDatabaseInject } from "./DataInjection";

const userReducer = (userDatabase = userDatabaseInject, action) => {
  switch (action.type) {
    case "USER_REGISTRATION":
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
      return {};
    default:
      return currentUser;
  }
};

const projectDatabaseReducer = (
  projectDatabaseReducer = projectDatabaseInject,
  action
) => {
  switch (action.type) {
    case "PROJECT_CREATE":
      return [...projectDatabaseReducer, action];
    default:
      return projectDatabaseReducer;
  }
};

export default combineReducers({
  userReducer,
  currentUserReducer,
  projectDatabaseReducer,
});
