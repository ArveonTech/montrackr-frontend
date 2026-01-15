const validateBudget = (totalBudget, formBudget) => {
  const errors = {
    isValidate: true,
    budget: "",
    categories: {},
  };

  // total budget
  if (!totalBudget.trim()) {
    errors.isValidate = false;
    errors.budget = "Budget is required";
  }

  // categories
  Object.keys(formBudget).forEach((key) => {
    if (!formBudget[key].trim()) {
      errors.isValidate = false;
      errors.categories[key] = "This field is required";
    }
  });

  // cleanup biar rapi
  if (Object.keys(errors.categories).length === 0) {
    delete errors.categories;
  }
  if (!errors.budget) {
    delete errors.budget;
  }

  return errors;
};

export default validateBudget;
