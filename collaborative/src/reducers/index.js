import { combineReducers } from "redux";

const userReducer = (userDatabase = [], action) => {
  switch (action.type) {
    case "USER_REGISTRATION":
      return [...userDatabase, action.payload];
    default:
      return userDatabase;
  }
};

const currentUserReducer = (currentUser = null, action) => {
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
