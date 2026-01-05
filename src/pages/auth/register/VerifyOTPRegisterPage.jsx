import { OTPForm } from "@/components/otp-form";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCountdown60 from "@/hooks/others/useCountdown60";
import DontHaveAccess from "@/pages/DontAccess";
import BlankLoadingPage from "@/pages/BlankLoadingPage";
import useSendOTPFromRegister from "@/hooks/auth/register/useSendOTPFromRegister";
import useVerifyOTPFromRegister from "@/hooks/auth/shared/useVerifyOTPFromRegister";

const VerifyOTPRegisterPage = () => {
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

  // send and verify otp from register
  const { isError: isErrorSendOTPRegister, error: errorSendOTPRegister, mutate: mutateSendOTPRegister } = useSendOTPFromRegister({ handleLoading: handleBlankPageLoading });
  const { isError: isErrorVerifyOTPRegister, data: dataVerifyOTPRegister, error: errorVerifyOTPRegister, mutate: mutateVerifyOTPRegister } = useVerifyOTPFromRegister({ handleLoading });

  useEffect(() => {
    if (!location.state) {
      return setIsDontAccess(true);
    }

    if (!location.state.status === "pending" && !location.state.from === "register") {
      return setIsDontAccess(true);
    }

    if (location.state.status === "pending" && location.state.from === "register") {
      mutateSendOTPRegister({ dataUser: location.state.dataUser });
    }
    setStartTimer(true);
  }, [location]);

  const sendOTP = () => {
    if (!location.state.status && !location.state.from) {
      return setIsDontAccess(true);
    }

    if (location.state.status === "pending" && location.state.from === "register") {
      mutateSendOTPRegister({ dataUser: location.state.dataUser });
    }
    setStartTimer(true);
  };

  // useEffect send otp register
  useEffect(() => {
    if (isErrorSendOTPRegister) {
      return setErrorOTP(errorVerifyOTPRegister.message);
    }
  }, [isErrorSendOTPRegister, errorSendOTPRegister]);

  // useEffect verify otp register
  useEffect(() => {
    if (isErrorVerifyOTPRegister) {
      return setErrorOTP(errorVerifyOTPRegister.message);
    }

    if (!isErrorVerifyOTPRegister && dataVerifyOTPRegister) {
      const accessToken = dataVerifyOTPRegister.tokens.accessToken || null;
      if (!accessToken) return sendOTP("Something went wrong");

      localStorage.setItem("access-token", accessToken);
      navigate("/home");
    }
  }, [isErrorVerifyOTPRegister, errorVerifyOTPRegister, dataVerifyOTPRegister]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (location.state.status === "pending" && location.state.from === "register") {
      const dataUser = { ...location.state.dataUser, token: valueOTP };
      mutateVerifyOTPRegister({ dataUser });
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

export default VerifyOTPRegisterPage;
