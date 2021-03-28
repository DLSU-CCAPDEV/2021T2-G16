import { combineReducers } from "redux";
import { userDatabaseInject, projectDatabaseInject } from "./DataInjection";

const userReducer = (userDatabase = userDatabaseInject, action) => {
  switch (action.type) {
    case "USER_REGISTRATION":
      const newUniqueID =
        Math.max.apply(
          Math,
          userDatabase.map(function (item) {
            return item.uniqueID;
          })
        ) + 1;

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
      return null;
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
