import { OTPForm } from "@/components/otp-form";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCountdown60 from "@/hooks/others/useCountdown60";
import DontHaveAccess from "@/pages/DontAccess";
import BlankLoadingPage from "@/pages/BlankLoadingPage";
import useSendOTPFromForgotPassword from "@/hooks/auth/forgot-password/useSendOTPFromForgotPassword";
import useVerifyOTPFromForgotPassword from "@/hooks/auth/shared/useVerifyOTPFromForgotPassword";

const VerifyOTPForgotPasswordPage = () => {
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

  // send and verify otp from forgot-password
  const { isError: isErrorSendOTPForgotPassword, error: errorSendOTPForgotPassword, mutate: mutateSendOTPForgotPassword } = useSendOTPFromForgotPassword({ handleLoading: handleBlankPageLoading });
  const { isError: isErrorVerifyOTPForgotPassword, data: dataVerifyOTPForgotPassword, error: errorVerifyOTPForgotPassword, mutate: mutateVerifyOTPForgotPassword } = useVerifyOTPFromForgotPassword({ handleLoading });

  useEffect(() => {
    if (!location.state) {
      return setIsDontAccess(true);
    }

    if (!location.state.status === "pending" && !location.state.from === "forgot-password") {
      return setIsDontAccess(true);
    }

    if (location.state.status === "pending" && location.state.from === "forgot-password") {
      mutateSendOTPForgotPassword({ dataUser: location.state.dataUser });
    }
    setStartTimer(true);
  }, [location]);

  const sendOTP = () => {
    if (!location.state.status && !location.state.from) {
      return setIsDontAccess(true);
    }

    if (location.state.status === "pending" && location.state.from === "forgot-password") {
      mutateSendOTPForgotPassword({ dataUser: location.state.dataUser });
    }
    setStartTimer(true);
  };

  // useEffect send otp forgot-password
  useEffect(() => {
    if (isErrorSendOTPForgotPassword) {
      return setErrorOTP(errorVerifyOTPForgotPassword.message);
    }
  }, [isErrorSendOTPForgotPassword, errorSendOTPForgotPassword]);

  // useEffect verify otp forgot-password
  useEffect(() => {
    if (isErrorVerifyOTPForgotPassword) {
      return setErrorOTP(errorVerifyOTPForgotPassword.message);
    }

    if (!isErrorVerifyOTPForgotPassword && dataVerifyOTPForgotPassword) {
      navigate("/set-password-forgot-password", { state: { status: dataVerifyOTPForgotPassword.status, from: "forgot-password", dataUser: dataVerifyOTPForgotPassword.data } });
    }
  }, [isErrorVerifyOTPForgotPassword, errorVerifyOTPForgotPassword, dataVerifyOTPForgotPassword]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (location.state.status === "pending" && location.state.from === "forgot-password") {
      const dataUser = { ...location.state.dataUser, token: valueOTP };
      mutateVerifyOTPForgotPassword({ dataUser });
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

export default VerifyOTPForgotPasswordPage;
