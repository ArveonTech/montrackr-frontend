import { cn } from "@/lib/utils/index";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Activity } from "react";
import { Spinner } from "./ui/spinner";

export function LoginForm({ formLogin, handleChangeInput, handleSubmit, handleButtonLoginWithGoogle, errorForm, showPassword, handleShowPassword, isLoadingCredentials, className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className={`text-center text-xl mb-3`}>Login to your account</CardTitle>
          <CardDescription className={`opacity-80`}>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Activity mode={errorForm ? "visible" : "hidden"}>
              <p className="text-center text-sm mb-5 text-red-500">{errorForm}</p>
            </Activity>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" name="email" placeholder="m@example.com" required className={`placeholder:opacity-50`} value={formLogin.email} onChange={handleChangeInput} />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a href="/forgot-password" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} name="password" placeholder="********" required autoComplete="current-password" value={formLogin.password} onChange={handleChangeInput} />
                  {showPassword ? (
                    <Eye className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={handleShowPassword} />
                  ) : (
                    <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={handleShowPassword} />
                  )}
                </div>
              </Field>
              <Field>
                <Button type="submit" className={`cursor-pointer`}>
                  {isLoadingCredentials ? <Spinner></Spinner> : "Login"}
                </Button>
                <Button variant="outline" type="button" className={`cursor-pointer`} onClick={handleButtonLoginWithGoogle}>
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/register">Register</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
