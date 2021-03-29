export const userRegistration = ({
  firstNameInput,
  lastNameInput,
  emailInput,
  passwordInput,
}) => {
  return {
    type: "USER_REGISTRATION",
    payload: {
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput,
    },
  };
};

export const userLogin = ({
  uniqueID,
  firstNameInput,
  lastNameInput,
  emailInput,
  passwordInput,
}) => {
  return {
    type: "USER_LOGIN",
    payload: {
      uniqueID,
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput,
    },
  };
};

export const userLogout = () => {
  return {
    type: "USER_LOGOUT",
  };
};

export const projectCreate = ({
  emailInput,
  projectName,
  decsription,
  members,
}) => {
  return {
    type: "PROJECT_CREATE",
    payload: {
      emailInput,
      projectName,
      decsription,
      members,
    },
  };
};
