import { useEffect, useState } from "react";
import validator from "validator";

const useValidationSetPassword = ({ form }) => {
  const [errorInputForm, setErrorInputForm] = useState({
    success: true,
    inputForm: {
      password: null,
      confirmPassword: null,
    },
  });

  useEffect(() => {
    let newErrors = {
      success: true,
      inputForm: {
        password: null,
        confirmPassword: null,
      },
    };

    if (
      form.password &&
      !validator.isStrongPassword(form.password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      newErrors.success = false;
      newErrors.inputForm.password = "Password must be at least 8 chars, contain uppercase & numbers!";
    }

    if (form.confirmPassword && form.password !== form.confirmPassword) {
      newErrors.success = false;
      newErrors.inputForm.confirmPassword = "Passwords do not match!";
    }

    setErrorInputForm(newErrors);
  }, [form]);

  return errorInputForm;
};

export default useValidationSetPassword;
