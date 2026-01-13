export const validateTransaction = (data) => {
  const errors = {};

  // title
  if (!data.title) {
    errors.title = "Title is required";
  }

  // amount
  if (!data.amount) {
    errors.amount = "Amount is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
