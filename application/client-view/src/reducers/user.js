const initialState = {
  hasLoaded: false,
  username: null,
  uniqueID: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      return {
        hasLoaded: true,
        username: action.payload.username,
        uniqueID: action.payload.uniqueID,
      };
    }
    case "USER_LOGOUT": {
      return {
        hasLoaded: false,
        username: null,
        uniqueID: null,
      };
    }
    default:
      return state;
  }
};
