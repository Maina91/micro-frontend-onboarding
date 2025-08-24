// src/pages/onboarding/PhoneVerification.tsx
import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
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

export function VerifyPhoneOtpPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone) {
      setError("Please enter your phone number");
      return;
    }

    setError("");
    setIsLoading(true);

    // try {
    //   // In dev, just log the action
    //   console.log("[DEV] Sending OTP to phone:", phone);

    //   // Navigate to OTP verification page with query param
    //   navigate(`/onboarding/phone/otp?phone=${encodeURIComponent(phone)}`);
    // } catch (err) {
    //   console.error(err);
    //   setError("Failed to send OTP. Please try again.");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-12">
      <CardHeader>
        <CardTitle>Phone Verification</CardTitle>
        <CardDescription>
          Enter your phone number to receive a 6-digit verification code.
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
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+254700000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
