import { SignupForm } from "@/components/signup-form";
import useLoginWithCredentials from "@/hooks/auth/useLoginWithCredentials";
import useParamsController from "@/hooks/others/UseParamsController";
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

  const [showPassword, setShowPassword] = useState(false);

  const statusLogin = decodeURIComponent(getParam("login"));

  const handleChangeInputFormRegister = (event) => {
    const { name, value } = event.target;
    setFormRegister((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const { isLoading: isLoadingCredentials, isError: isErrorCredentials, data: dataCredentials, error: errorCredentials, refetch: refetchCredentials } = useLoginWithCredentials(formRegister);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setErrorForm(null);

    if (isErrorCredentials) {
      return setErrorForm(errorCredentials.message);
    }

    if (dataCredentials) {
      localStorage.setItem("access-token", dataCredentials.tokens.accessToken);
      return navigate("/home");
    }

    if (statusLogin === "failed") {
      return setErrorForm("Login failed!");
    }
  }, [isErrorCredentials, errorCredentials, dataCredentials, statusLogin]);

  const handleSubmit = (event) => {
    event.preventDefault();
    refetchCredentials();
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
          showPassword={showPassword}
          handleShowPassword={handleShowPassword}
          isLoadingCredentials={isLoadingCredentials}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
