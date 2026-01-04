import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Activity } from "react";
import { Spinner } from "./ui/spinner";

const padZero = (num) => {
  return num < 10 ? `0${num}` : `${num}`;
};

export function OTPForm({ errorOTP, valueOTP, setValueOTP, isLoading, timer, sendOTP, handleSubmit, ...props }) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Enter verification code</CardTitle>
        <CardDescription>We sent a 6-digit code to your email.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Activity mode={errorOTP ? "visible" : "hidden"}>
            <p className="text-center text-sm mb-5 text-red-500">{errorOTP}</p>
          </Activity>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="otp">Verification code</FieldLabel>
              <InputOTP
                maxLength={6}
                id="otp"
                required
                value={valueOTP}
                onChange={(value) => {
                  if (/^[A-Z0-9]*$/.test(value)) {
                    setValueOTP(value);
                  }
                }}
              >
                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription>Enter the 6-digit code sent to your email.</FieldDescription>
            </Field>
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
              {timer > 0 ? (
                <p className="text-center">00:{padZero(timer)}</p>
              ) : (
                <FieldDescription className="text-center">
                  Didn&apos;t receive the code?{" "}
                  <button className="underline cursor-pointer hover:opacity-80" onClick={sendOTP}>
                    Resend
                  </button>
                </FieldDescription>
              )}
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
