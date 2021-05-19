const initialState = {
  username: null,
  uniqueID: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "USER_FETCH": {
      const { username, uniqueID } = action.payload;

      return {
        username,
        uniqueID,
      };
    }
    default:
      return state;
  }
};
