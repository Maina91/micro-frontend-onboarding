"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
// import { signupAction } from "@/core/actions/onboarding/signup";
import type { SignupFormData } from "@/core/validators/signup.schema";
import { ArrowLeft, Shield } from "lucide-react";

interface SignupFormProps {
  preSignupData: {
    accountType: string;
    agent_no?: string;
    
  };
  onBack: () => void;
}


export function SignupForm({ preSignupData, onBack }: SignupFormProps) {
  const [formData, setFormData] = useState<SignupFormData>({
    accountType: preSignupData.accountType as any,
    agent_no: preSignupData.agent_no || "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    agreeToTermsPrivacy: false,
    consentToSms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // try {
    //   const result = await signupAction(formData);

    //   if (result.success) {
    //     // Redirect to phone OTP verification first
    //     window.location.href = `/onboarding/verify-otp?type=phone&email=${encodeURIComponent(formData.email)}`;
    //   } else {
    //     setErrors({ general: result.error || "Signup failed" });
    //   }
    // } catch (error) {
    //   console.error("[SIGNUP_FORM_ERROR]", error);
    //   setErrors({ general: "An unexpected error occurred" });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleInputChange = (
    field: keyof SignupFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardDescription>
            Provide your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
                {errors.general}
              </div>
            )}

            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+254 700 000 000"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
