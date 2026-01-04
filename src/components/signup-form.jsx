import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Activity } from "react";

export function SignupForm({ formRegister, handleChangeInput, handleSubmit, handleButtonRegisterWithGoogle, errorForm, errorInputForm, showPassword, handleShowPassword, isLoadingCredentials, ...props }) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription className={`opacity-80`}>Enter your information below to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Activity mode={errorForm ? "visible" : "hidden"}>
            <p className="text-center text-sm mb-5 text-red-500">{errorForm}</p>
          </Activity>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Username</FieldLabel>
              <Input id="name" type="text" placeholder="John Doe" name="username" required className={`placeholder::opacity-80`} value={formRegister.username} onChange={handleChangeInput} />
              <Activity mode={!errorInputForm?.success && errorInputForm?.inputForm.username ? "visible" : "hidden"}>
                <p className="text-xs text-red-500 italic">*{errorInputForm?.inputForm.username}</p>
              </Activity>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="m@example.com" name="email" required value={formRegister.email} onChange={handleChangeInput} />
              <Activity mode={!errorInputForm?.success && errorInputForm?.inputForm.email ? "visible" : "hidden"}>
                <p className="text-xs text-red-500 italic">*{errorInputForm?.inputForm.email}</p>
              </Activity>
              <FieldDescription>We&apos;ll use this to contact you. We will not share your email with anyone else.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} name="password" placeholder="********" required autoComplete="current-password" value={formRegister.password} onChange={handleChangeInput} />
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
            <Field>
              <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
              <Input id="confirm-password" type="password" name="confirmPassword" required value={formRegister.confirmPassword} onChange={handleChangeInput} />
              <Activity mode={!errorInputForm?.success && errorInputForm?.inputForm.confirmPassword ? "visible" : "hidden"}>
                <p className="text-xs text-red-500 italic">*{errorInputForm?.inputForm.confirmPassword}</p>
              </Activity>
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" className={`cursor-pointer`}>
                  Create Account
                </Button>
                <Button variant="outline" type="button" onClick={handleButtonRegisterWithGoogle} className={`cursor-pointer`}>
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
