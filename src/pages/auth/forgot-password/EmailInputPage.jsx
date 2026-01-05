import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Activity, useEffect, useState } from "react";
import validator from "validator";
import useForgotPassword from "@/hooks/auth/forgot-password/useForgotPassword";
import { Spinner } from "@/components/ui/spinner";

const EmailInputPage = () => {
  const navigate = useNavigate();
  const [valueEmail, setValueEmail] = useState("");

  const [errorForm, setErrorForm] = useState(null);
  const [errorInputForm, setErrorInputForm] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const validationEmail = () => {
    if (valueEmail && !validator.isEmail(valueEmail)) {
      return { success: false, message: "Invalid email!" };
    }

    return { success: true, message: "ok" };
  };

  const handleChangeInputEmail = (event) => {
    const valueInput = event.target.value;
    setValueEmail(valueInput);
  };

  const handleLoading = (value) => {
    setisLoading(value);
  };

  const { isError: isErrorVerifyEmail, data: dataVerifyEmail, error: errorVerifyEmail, mutate: mutateVerifyEmail } = useForgotPassword({ handleLoading });

  useEffect(() => {
    setErrorForm(null);

    if (isErrorVerifyEmail) {
      return setErrorForm(errorVerifyEmail.message);
    }

    if (!isErrorVerifyEmail && dataVerifyEmail) {
      navigate("/home");
    }
  }, [isErrorVerifyEmail, errorVerifyEmail, dataVerifyEmail]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const invalidEmail = validationEmail();
    if (!invalidEmail.success) return setErrorInputForm(invalidEmail.message);
    if (valueEmail.trim() === "") return setErrorInputForm("Email is required!");

    setErrorInputForm(null);

    mutateVerifyEmail({ dataUser: { email: valueEmail } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Enter your email</CardTitle>
          <CardDescription>We will use this email to continue the next process. </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Activity mode={errorForm ? "visible" : "hidden"}>
              <p className="text-center text-sm mb-5 text-red-500">{errorForm}</p>
            </Activity>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" name="email" required value={valueEmail} onChange={handleChangeInputEmail} className={`placeholder:opacity-70`} />
              <Activity mode={errorInputForm ? "visible" : "hidden"}>
                <p className="text-xs text-red-500 italic">*{errorInputForm}</p>
              </Activity>
            </div>
            {isLoading ? (
              <div className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 rounded-md">
                <Spinner className={`w-full`}></Spinner>
              </div>
            ) : (
              <Button type="submit" className={`cursor-pointer w-full`}>
                Verify
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailInputPage;
