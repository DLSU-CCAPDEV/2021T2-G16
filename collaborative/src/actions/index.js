export const userRegistration = ({
  firstNameInput,
  lastNameInput,
  emailInput,
  passwordInput,
}) => {
  return {
    type: "USER_REGISTRATION",
    payload: {
      firstName: firstNameInput,
      lastName: lastNameInput,
      email: emailInput,
      password: passwordInput,
    },
  };
};

export const userLogin = ({
  uniqueID,
  firstName,
  lastName,
  email,
  password,
}) => {
  return {
    type: "USER_LOGIN",
    payload: {
      uniqueID,
      firstName,
      lastName,
      email,
      password,
    },
  };
};

export const userLogout = () => {
  return {
    type: "USER_LOGOUT",
  };
};

export const projectCreate = ({ email, projectName, decsription, members }) => {
  return {
    type: "PROJECT_CREATE",
    payload: {
      email,
      projectName,
      decsription,
      members,
    },
  };
};

export const taskDelete = (taskProp) => {
  return {
    type: "TASK_DELETE",
    payload: {
      taskProp,
    },
  };
};
