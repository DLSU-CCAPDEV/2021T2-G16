import { combineReducers } from "redux";

//  TODO Before production, remove test User
const userReducer = (
  userDatabase = [
    { firstNameInput: "TEST USER", emailInput: "a", passwordInput: "a" },
  ],
  action
) => {
  switch (action.type) {
    case "USER_REGISTRATION":
      return [...userDatabase, action.payload];
    default:
      return userDatabase;
  }
};

//  TODO Before production, remove test User
const currentUserReducer = (
  currentUser = {
    firstNameInput: "TEST USER",
    emailInput: "a",
    passwordInput: "a",
  },
  action
) => {
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
