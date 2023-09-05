import emailValidator from "deep-email-validator";

export const isMissing = (...values) => {
  return values.some((val) => {
    return val === null || val === undefined || val === "" || val === NaN;
  });
};

export const isEmailValid = async (email) => {
  return emailValidator.validate(email);
};
