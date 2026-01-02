import { LoginForm } from "@/components/login-form";
import useLoginWithCredentials from "@/hooks/auth/useLoginWithCredentials";
import useParamsController from "@/hooks/others/UseParamsController";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { getParam } = useParamsController();
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const [errorForm, setErrorForm] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const statusLogin = decodeURIComponent(getParam("login"));

  const handleChangeInputFormLogin = (event) => {
    const { name, value } = event.target;
    setFormLogin((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const { isLoading: isLoadingCredentials, isError: isErrorCredentials, data: dataCredentials, error: errorCredentials, refetch: refetchCredentials } = useLoginWithCredentials(formLogin);

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

  const handleButtonLoginWithGoogle = () => {
    window.location.href = import.meta.env.VITE_AUTH_GOOGLE;
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          formLogin={formLogin}
          handleChangeInput={handleChangeInputFormLogin}
          handleSubmit={handleSubmit}
          handleButtonLoginWithGoogle={handleButtonLoginWithGoogle}
          errorForm={errorForm}
          showPassword={showPassword}
          handleShowPassword={handleShowPassword}
          isLoadingCredentials={isLoadingCredentials}
        />
      </div>
    </div>
  );
};

export default LoginPage;
