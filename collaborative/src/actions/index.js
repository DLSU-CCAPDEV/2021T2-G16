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
  firstNameInput,
  lastNameInput,
  emailInput,
  passwordInput,
}) => {
  return {
    type: "USER_LOGIN",
    payload: {
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
