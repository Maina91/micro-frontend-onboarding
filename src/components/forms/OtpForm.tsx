// src/components/onboarding/OtpVerificationForm.tsx
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";

type Props = {
  mode: "phone" | "email";
  title: string;
  description: string;
  fieldName: string; // "phone" | "email"
  placeholder: string;
  sendOtp: (
    identifier: string
  ) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (
    identifier: string,
    otp: string
  ) => Promise<{ success: boolean; error?: string }>;
  onVerified: (identifier: string) => void;
};

export function OtpVerificationForm({
  mode,
  title,
  description,
  fieldName,
  placeholder,
  sendOtp,
  verifyOtp,
  onVerified,
}: Props) {
  const [serverError, setServerError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Cooldown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const form = useForm({
    defaultValues: {
      [fieldName]: "",
      otp: "",
    },
    onSubmit: async ({ value }) => {
      setServerError("");

      const identifier = value[fieldName] as string;

      try {
        if (!otpSent) {
          // Step 1: Send OTP
          const res = await sendOtp(identifier);
          if (!res.success) throw new Error(res.error || "Failed to send OTP");

          setOtpSent(true);
          setCooldown(60);
          return;
        }

        // Step 2: Verify OTP
        const res = await verifyOtp(identifier, value.otp);
        if (!res.success) throw new Error(res.error || "Invalid OTP");

        onVerified(identifier);
      } catch (err: any) {
        setServerError(
          err.message || "Something went wrong. Please try again."
        );
      }
    },
  });

  return (
    <Card className="w-full max-w-md mx-auto mt-12">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {otpSent
            ? `Enter the 6-digit code we sent to your ${mode}.`
            : description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {serverError && (
          <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md mb-4">
            {serverError}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Identifier Input (email/phone) */}
          <form.Field
            name={fieldName}
            validators={{
              onChange: ({ value }) =>
                !value
                  ? `${title.split(" ")[0]} is required`
                  : mode === "phone" && !/^\+?[1-9]\d{9,14}$/.test(value)
                    ? "Enter a valid phone number"
                    : mode === "email" &&
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                      ? "Enter a valid email address"
                      : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={fieldName}>
                  {mode === "phone" ? "Phone Number" : "Email Address"}
                </Label>
                <Input
                  id={fieldName}
                  type={mode === "phone" ? "tel" : "email"}
                  placeholder={placeholder}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={otpSent}
                />
                {field.state.meta.errors[0] && (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* OTP Input */}
          {otpSent && (
            <form.Field
              name="otp"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "OTP is required"
                    : value.length !== 6
                      ? "OTP must be 6 digits"
                      : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors[0] && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          )}

          {/* Submit + Resend */}
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full"
              disabled={
                form.state.isSubmitting ||
                (!otpSent && !form.state.values[fieldName])
              }
            >
              {form.state.isSubmitting
                ? otpSent
                  ? "Verifying..."
                  : "Sending OTP..."
                : otpSent
                  ? "Verify OTP"
                  : "Send OTP"}
            </Button>

            {otpSent && (
              <Button
                type="button"
                variant="ghost"
                className="w-full text-sm"
                disabled={cooldown > 0}
                onClick={() => form.handleSubmit()}
              >
                {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
