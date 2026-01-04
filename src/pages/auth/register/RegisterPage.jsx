import { SignupForm } from "@/components/signup-form";
import UseEmptyFormRegister from "@/hooks/auth/useEmptyFormRegister";
import useRegisterWithCredentials from "@/hooks/auth/register/useRegisterWithCredentials";
import UseValidationRegister from "@/hooks/auth/useValidationFormRegister";
import useParamsController from "@/hooks/others/useParamsControllers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { getParam } = useParamsController();
  const [formRegister, setFormRegister] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorForm, setErrorForm] = useState(null);
  const [errorInputForm, setErrorInputForm] = useState({ success: true, inputForm: { username: null, email: null, password: null, confirmPassword: null } });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const statusRegister = decodeURIComponent(getParam("register"));

  const handleChangeInputFormRegister = (event) => {
    const { name, value } = event.target;
    setFormRegister((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleLoading = (value) => {
    setisLoading(value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { isError: isErrorCredentials, data: dataCredentials, error: errorCredentials, mutate: mutateCredentials } = useRegisterWithCredentials({ handleLoading });

  const emptyForm = UseEmptyFormRegister({ form: formRegister });
  const invalidForm = UseValidationRegister({ form: formRegister });

  useEffect(() => {
    setErrorForm(null);

    if (isErrorCredentials) {
      return setErrorForm(errorCredentials.message);
    }

    if (dataCredentials) {
      const accessToken = dataCredentials.tokens.accessToken || null;

      if (!accessToken) return errorForm("Something went wrong");

      localStorage.setItem("access-token", accessToken);

      return navigate("/home");
    }

    if (statusRegister === "failed") {
      return setErrorForm("Login failed!");
    }
  }, [isErrorCredentials, errorCredentials, dataCredentials, statusRegister]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emptyForm.success) return setErrorInputForm(emptyForm);
    if (!invalidForm.success) return setErrorInputForm(invalidForm);

    setErrorInputForm({ success: true, inputForm: { username: null, email: null, password: null, confirmPassword: null } });

    const { confirmPassword, ...form } = formRegister;

    mutateCredentials({ formRegister: form });
  };

  const handleButtonRegisterWithGoogle = () => {
    window.location.href = import.meta.env.VITE_AUTH_GOOGLE;
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm
          formRegister={formRegister}
          handleChangeInput={handleChangeInputFormRegister}
          handleSubmit={handleSubmit}
          handleButtonRegisterWithGoogle={handleButtonRegisterWithGoogle}
          errorForm={errorForm}
          errorInputForm={errorInputForm}
          showPassword={showPassword}
          handleShowPassword={handleShowPassword}
          isLoadingCredentials={isLoading}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
