import { Activity, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Eye, EyeOff } from "lucide-react";
import useValidationSetPassword from "@/hooks/auth/useValidationSetPassword";
import useEmptySetPassword from "@/hooks/auth/useEmptySetPassword";
import useParamsControllers from "@/hooks/others/useParamsControllers";
import DontHaveAccess from "@/pages/DontAccess";
import { Spinner } from "@/components/ui/spinner";
import useSetPassword from "@/hooks/auth/social/useSetPasword";
import { useNavigate } from "react-router-dom";

const SetPasswordPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorInputForm, setErrorInputForm] = useState({ success: true, inputForm: { password: null, confirmPassword: null } });
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isDontAccess, setIsDontAccess] = useState(false);

  const { getAllParam } = useParamsControllers();

  const handleLoading = (value) => {
    setIsLoading(value);
  };

  const { isError: isErrorSetPassword, error: errorSetPassword, data: dataSetPassword, mutate: mutateSetPassword } = useSetPassword({ handleLoading });

  useEffect(() => {
    const params = getAllParam();

    if (!params.get("status") && !params.get("email") && !params.get("username")) {
      setIsDontAccess(false);
    }
  }, []);

  const emptyForm = useEmptySetPassword({ form: password });
  const invalidForm = useValidationSetPassword({ form: password });

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setPassword((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isErrorSetPassword) return;

    if (!isErrorSetPassword && dataSetPassword) {
      const accessToken = dataSetPassword?.tokens?.accessToken || null;
      if (!accessToken) return se("Something went wrong");

      localStorage.setItem("access-token", accessToken);
      navigate("/home");
    }
  }, [isErrorSetPassword, errorSetPassword, dataSetPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emptyForm.success) return setErrorInputForm(emptyForm);
    if (!invalidForm.success) return setErrorInputForm(invalidForm);

    setErrorInputForm({ success: true, inputForm: { username: null, email: null, password: null, confirmPassword: null } });

    const dataForm = {
      status: getAllParam().get("status"),
      user: {
        email: getAllParam().get("email"),
        username: getAllParam().get("username"),
        password: password.password,
      },
    };

    mutateSetPassword({ dataUser: dataForm });
  };

  return (
    <>
      {isDontAccess ? (
        <DontHaveAccess />
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Set New Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Activity mode={isErrorSetPassword ? "visible" : "hidden"}>
                  <p className="text-center text-sm mb-5 text-red-500">{errorSetPassword?.message}</p>
                </Activity>
                <div>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative">
                      <Input id="password" type={showPassword ? "text" : "password"} name="password" placeholder="********" required autoComplete="current-password" value={password.password} onChange={handleChangeInput} />
                      {showPassword ? (
                        <Eye className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={handleShowPassword} />
                      ) : (
                        <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={handleShowPassword} />
                      )}
                    </div>
                    <Activity mode={!errorInputForm?.success && errorInputForm?.inputForm.password ? "visible" : "hidden"}>
                      <p className="text-xs text-red-500 italic">*{errorInputForm?.inputForm.password}</p>
                    </Activity>
                    <FieldDescription>Must be at least 8 characters long.</FieldDescription>
                  </Field>
                </div>
                <div>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                    <Input id="confirm-password" type="password" name="confirmPassword" required value={password.confirmPassword} onChange={handleChangeInput} />
                    <Activity mode={!errorInputForm?.success && errorInputForm?.inputForm.confirmPassword ? "visible" : "hidden"}>
                      <p className="text-xs text-red-500 italic">*{errorInputForm?.inputForm.confirmPassword}</p>
                    </Activity>
                  </Field>
                </div>
                <FieldGroup>
                  {isLoading ? (
                    <div className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 rounded-md">
                      <Spinner className={`w-full`}></Spinner>
                    </div>
                  ) : (
                    <Button type="submit" className={`cursor-pointer`}>
                      Verify
                    </Button>
                  )}
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default SetPasswordPage;
