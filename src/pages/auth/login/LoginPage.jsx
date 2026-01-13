import { LoginForm } from "@/components/login-form";
import useLoginWithCredentials from "@/hooks/auth/login/useLoginWithCredentials";
import useParamsControllers from "@/hooks/others/useParamsControllers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { getParam } = useParamsControllers();
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const [errorForm, setErrorForm] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const statusLogin = decodeURIComponent(getParam("login"));

  const handleChangeInputFormLogin = (event) => {
    const { name, value } = event.target;
    setFormLogin((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleLoading = (value) => {
    setIsLoading(value);
  };

  const { isError: isErrorCredentials, data: dataCredentials, error: errorCredentials, mutate: mutateCredentials } = useLoginWithCredentials(formLogin, handleLoading);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isErrorCredentials) {
      return setErrorForm(errorCredentials.message);
    }

    if (!isErrorCredentials && dataCredentials) {
      if (dataCredentials.status === "pending") {
        navigate("/verify-otp-login", { state: { status: dataCredentials.status, from: "login", dataUser: dataCredentials.data } });
      } else {
        const accessToken = dataCredentials.tokens.accessToken || null;

        if (!accessToken) return setErrorForm("Something went wrong");

        localStorage.setItem("access-token", accessToken);
        navigate("/dashboard");
      }
    }

    if (!isErrorCredentials && !dataCredentials && statusLogin === "failed") {
      return setErrorForm("Login failed!");
    }
  }, [isErrorCredentials, dataCredentials, statusLogin]);

  const handleSubmit = (event) => {
    event.preventDefault();
    mutateCredentials();
  };

  const handleButtonLoginWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_AUTH_GOOGLE}?source="login"`;
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
          isLoadingCredentials={isLoading}
        />
      </div>
    </div>
  );
};

export default LoginPage;
