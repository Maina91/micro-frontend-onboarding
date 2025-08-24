// src/components/OtpForm.tsx
import type React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
// import { verifyOtpAction } from "@/core/actions/onboarding/otp";

interface OtpFormProps {
  identifier: string; // email or phone
  type: "email" | "phone";
  onSuccess?: (token: string) => void; // optional callback for redirect
}

export function OtpForm({ identifier, type, onSuccess }: OtpFormProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");

    // try {
    //   const result = await verifyOtpAction.mutateAsync({
    //     identifier,
    //     code,
    //     type,
    //   });

    //   if (result.success) {
    //     localStorage.setItem("auth_token", result.data.token);
    //     if (onSuccess) {
    //       onSuccess(result.data.token);
    //     } else {
    //       window.location.href = "/onboarding/profile";
    //     }
    //   } else {
    //     setError(result.error || "Invalid OTP code");
    //   }
    // } catch (err) {
    //   console.error("[OTP_FORM_ERROR]", err);
    //   setError("An unexpected error occurred");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleResendOtp = async () => {
    console.log(`[OTP] Resending ${type} OTP to:`, identifier);
    // TODO: Implement real resend logic using server function
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {type === "email" ? "Verify Your Email" : "Verify Your Phone"}
        </CardTitle>
        <CardDescription>
          We've sent a 6-digit verification code to{" "}
          <strong>{identifier}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="otp">Verification Code</Label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={(value) => {
                  setCode(value);
                  setError("");
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || code.length !== 6}
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-primary hover:underline"
              >
                Resend OTP
              </button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
