import { useState, useEffect } from "react";

const useEmptySetPassword = ({ form }) => {
  const [errorInputForm, setErrorInputForm] = useState({ success: true, inputForm: { password: null, confirmPassword: null } });

  useEffect(() => {
    const emptyForm = Object.keys(form).filter((key) => form[key].trim() === "");

    if (emptyForm.length > 0) {
      const updatedErrors = { success: false, inputForm: { password: null, confirmPassword: null } };

      emptyForm.forEach((field) => {
        updatedErrors.inputForm[field] = `${field == "confirmPassword" ? "confirm-password" : field} is required!`;
      });

      setErrorInputForm(updatedErrors);
    } else {
      setErrorInputForm({ success: true, inputForm: { password: null, confirmPassword: null } });
    }
  }, [form]);

  return errorInputForm;
};

export default useEmptySetPassword;
