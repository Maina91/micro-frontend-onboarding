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
    referralCode?: string;
  };
  onBack: () => void;
}

const accountTypeLabels = {
  kenyan_individual: "Kenyan Individual",
  foreign_individual: "Foreign Individual",
  minor: "Minor Account",
  joint_account: "Joint Account",
  corporate: "Corporate Account",
  trust: "Trust Account",
};

export function SignupForm({ preSignupData, onBack }: SignupFormProps) {
  const [formData, setFormData] = useState<SignupFormData>({
    accountType: preSignupData.accountType as any,
    referralCode: preSignupData.referralCode || "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    agreeToTerms: false,
    agreeToPrivacyPolicy: false,
    consentToSms: false,
    consentToMarketing: false,
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
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Create Your Account
          </h2>
          <p className="text-muted-foreground">
            Complete your registration details
          </p>
        </div>
      </div>

      {/* Account Type Summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Account Type</p>
              <p className="font-medium">
                {
                  accountTypeLabels[
                    preSignupData.accountType as keyof typeof accountTypeLabels
                  ]
                }
              </p>
            </div>
            {preSignupData.referralCode && (
              <Badge variant="secondary">
                Referral: {preSignupData.referralCode}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
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

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  handleInputChange("dateOfBirth", e.target.value)
                }
                className={errors.dateOfBirth ? "border-destructive" : ""}
              />
              {errors.dateOfBirth && (
                <p className="text-sm text-destructive">{errors.dateOfBirth}</p>
              )}
            </div>

            {/* Password Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={errors.password ? "border-destructive" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className={errors.confirmPassword ? "border-destructive" : ""}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Consent Section */}
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <h3 className="font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Agreements & Consent
              </h3>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      handleInputChange("agreeToTerms", checked as boolean)
                    }
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="agreeToTerms"
                      className="text-sm font-normal cursor-pointer"
                    >
                      I agree to the{" "}
                      <a
                        href="/terms"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Terms of Service
                      </a>{" "}
                      *
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToPrivacyPolicy"
                    checked={formData.agreeToPrivacyPolicy}
                    onCheckedChange={(checked) =>
                      handleInputChange(
                        "agreeToPrivacyPolicy",
                        checked as boolean
                      )
                    }
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="agreeToPrivacyPolicy"
                      className="text-sm font-normal cursor-pointer"
                    >
                      I agree to the{" "}
                      <a
                        href="/privacy"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Privacy Policy
                      </a>{" "}
                      *
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consentToSms"
                    checked={formData.consentToSms}
                    onCheckedChange={(checked) =>
                      handleInputChange("consentToSms", checked as boolean)
                    }
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="consentToSms"
                      className="text-sm font-normal cursor-pointer"
                    >
                      I consent to receive SMS messages for account verification
                      and security purposes *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Standard messaging rates may apply. You can opt out at any
                      time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consentToMarketing"
                    checked={formData.consentToMarketing}
                    onCheckedChange={(checked) =>
                      handleInputChange(
                        "consentToMarketing",
                        checked as boolean
                      )
                    }
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="consentToMarketing"
                      className="text-sm font-normal cursor-pointer"
                    >
                      I would like to receive marketing communications about
                      investment opportunities
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Optional - You can change this preference later
                    </p>
                  </div>
                </div>
              </div>

              {(errors.agreeToTerms ||
                errors.agreeToPrivacyPolicy ||
                errors.consentToSms) && (
                <div className="text-sm text-destructive">
                  {errors.agreeToTerms ||
                    errors.agreeToPrivacyPolicy ||
                    errors.consentToSms}
                </div>
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
