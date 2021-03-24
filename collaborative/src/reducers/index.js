import { combineReducers } from "redux";
import { userDatabaseInject } from "./DataInjection";

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

export default combineReducers({
  userReducer,
  currentUserReducer,
});
