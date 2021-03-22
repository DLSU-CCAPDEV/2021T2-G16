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

export const userLogin = ({ emailInput, passwordInput }) => {
  return {
    type: "USER_LOGIN",
    payload: {
      emailInput,
      passwordInput,
    },
  };
};
