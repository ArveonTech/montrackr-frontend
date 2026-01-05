import { OTPForm } from "@/components/otp-form";
import useVerifyOTPFromLogin from "@/hooks/auth/shared/useVerifyOTPFromLogin";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSendOTPFromLogin from "@/hooks/auth/login/useSendOTPFromLogin";
import useCountdown60 from "@/hooks/others/useCountdown60";
import DontHaveAccess from "@/pages/DontAccess";
import BlankLoadingPage from "@/pages/BlankLoadingPage";

const VerifyOTPLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [valueOTP, setValueOTP] = useState("");

  const [isBlankPage, setIsBlankPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDontAccess, setIsDontAccess] = useState(false);

  const [errorOTP, setErrorOTP] = useState(null);
  const [startTimer, setStartTimer] = useState(false);
  const timeLeft = useCountdown60(startTimer);

  const handleLoading = (value) => {
    setIsLoading(value);
  };

  const handleBlankPageLoading = (value) => {
    setIsBlankPage(value);
  };

  // send and verify otp from login
  const { isError: isErrorSendOTPLogin, error: errorSendOTPLogin, mutate: mutateSendOTPLogin } = useSendOTPFromLogin({ handleLoading: handleBlankPageLoading });
  const { isError: isErrorVerifyOTPLogin, data: dataVerifyOTPLogin, error: errorVerifyOTPLogin, mutate: mutateVerifyOTPLogin } = useVerifyOTPFromLogin({ handleLoading });

  useEffect(() => {
    if (!location.state) {
      return setIsDontAccess(true);
    }

    if (!location.state.status === "pending" && !location.state.from === "login") {
      return setIsDontAccess(true);
    }

    if (location.state.status === "pending" && location.state.from === "login") {
      setErrorOTP("Your account not verified. Please verify your email.");
      mutateSendOTPLogin({ dataUser: location.state.dataUser });
    }
    setStartTimer(true);
  }, [location]);

  const sendOTP = () => {
    if (!location.state.status && !location.state.from) {
      return setIsDontAccess(true);
    }

    if (location.state.status === "pending" && location.state.from === "login") {
      setErrorOTP("Your account not verified. Please verify your email.");
      mutateSendOTPLogin({ dataUser: location.state.dataUser });
    }
    setStartTimer(true);
  };

  // useEffect send otp login
  useEffect(() => {
    if (isErrorSendOTPLogin) {
      return setErrorOTP(errorVerifyOTPLogin.message);
    }
  }, [isErrorSendOTPLogin, errorSendOTPLogin]);

  // useEffect verify otp login
  useEffect(() => {
    if (isErrorVerifyOTPLogin) {
      return setErrorOTP(errorVerifyOTPLogin.message);
    }

    if (!isErrorVerifyOTPLogin && dataVerifyOTPLogin) {
      const accessToken = dataVerifyOTPLogin.tokens.accessToken || null;
      if (!accessToken) return sendOTP("Something went wrong");

      localStorage.setItem("access-token", accessToken);
      navigate("/home");
    }
  }, [isErrorVerifyOTPLogin, errorVerifyOTPLogin, dataVerifyOTPLogin]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (location.state.status === "pending" && location.state.from === "login") {
      const dataUser = { ...location.state.dataUser, token: valueOTP };
      mutateVerifyOTPLogin({ dataUser });
    }
  };

  return (
    <>
      {isDontAccess ? (
        <DontHaveAccess />
      ) : isBlankPage ? (
        <BlankLoadingPage />
      ) : (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-xs">
            <OTPForm errorOTP={errorOTP} valueOTP={valueOTP} setValueOTP={setValueOTP} isLoading={isLoading} timer={timeLeft} sendOTP={sendOTP} handleSubmit={handleSubmit} />
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyOTPLoginPage;
