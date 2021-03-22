// export const dummyActionCreater = (data = [], action) => {
//   return data;
// };

export const userLogin = ({ emailInput, passwordInput }) => {
  console.log(emailInput, passwordInput);
  return {
    type: "USER_LOGIN",
    payload: {
      emailInput,
      passwordInput,
    },
  };
};
