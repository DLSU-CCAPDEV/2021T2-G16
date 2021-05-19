const initialState = {
  username: null,
  uniqueID: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "APP_LOAD":
    case "USER_LOGIN": {
      return {
        username: action.payload.username,
        uniqueID: action.payload.uniqueID,
      };
    }
    case "USER_LOGOUT": {
      return {
        username: null,
        uniqueID: null,
      };
    }
    default:
      return state;
  }
};
