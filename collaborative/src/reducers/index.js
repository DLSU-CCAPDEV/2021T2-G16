import { combineReducers } from "redux";

const userReducer = (userDatabase = [], action) => {
  if (action.type === "USER_REGISTRATION") {
    return [...userDatabase, action.payload];
  } else {
    return userDatabase;
  }
};

const currentUserReducer = (currentUser = null, action) => {
  if (action.type === "USER_LOGIN") {
  } else {
    return currentUser;
  }
};

export default combineReducers({
  userReducer,
  currentUser: currentUserReducer,
});
