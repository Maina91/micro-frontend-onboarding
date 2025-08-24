"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  ArrowRight,
  Users,
  Building,
  Shield,
  AlertCircle,
  FileText,
} from "lucide-react";
// import { validateReferralCode } from "../../server/actions/referrals";
import { toast } from "sonner";

interface PreSignupFormProps {
  onContinue: (data: { accountType: string; referralCode?: string }) => void;
}

const accountTypes = [
  {
    value: "kenyan_individual",
    label: "Kenyan Individual",
    description: "For Kenyan citizens and residents",
    icon: Users,
    requirements: [
      "Valid Kenyan ID",
      "Proof of address",
      "Minimum age: 18 years",
    ],
  },
  {
    value: "foreign_individual",
    label: "Foreign Individual",
    description: "For non-Kenyan individuals",
    icon: Users,
    requirements: [
      "Valid passport",
      "Proof of address",
      "Tax identification number",
    ],
  },
  {
    value: "minor",
    label: "Minor Account",
    description: "For individuals under 18 years",
    icon: Shield,
    requirements: ["Guardian consent", "Birth certificate", "Guardian's ID"],
  },
  {
    value: "joint_account",
    label: "Joint Account",
    description: "Shared account for multiple individuals",
    icon: Users,
    requirements: [
      "All parties' IDs",
      "Joint agreement",
      "Proof of relationship",
    ],
  },
  {
    value: "corporate",
    label: "Corporate Account",
    description: "For businesses and organizations",
    icon: Building,
    requirements: [
      "Certificate of incorporation",
      "KRA PIN",
      "Board resolution",
    ],
  },
  {
    value: "trust",
    label: "Trust Account",
    description: "For trust and estate management",
    icon: Shield,
    requirements: [
      "Trust deed",
      "Trustee identification",
      "Legal documentation",
    ],
  },
];

export function PreSignupForm({ onContinue }: PreSignupFormProps) {
  const [accountType, setAccountType] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [hasReferralCode, setHasReferralCode] = useState(false);
  const [referralValidated, setReferralValidated] = useState(false);
  const [validatingReferral, setValidatingReferral] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToPrivacy, setAgreeToPrivacy] = useState(false);
  const [consentToSms, setConsentToSms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateReferral = async (code: string) => {
    if (!code.trim()) return;

    setValidatingReferral(true);
    try {
    //   const result = await validateReferralCode(code);
    //   if (result.success) {
    //     setReferralValidated(true);
    //     toast.success("Referral code validated successfully!");
    //   } else {
    //     setReferralValidated(false);
    //     toast.error(result.error || "Invalid referral code");
    //   }
    } catch (error) {
      setReferralValidated(false);
      toast.error("Failed to validate referral code");
    } finally {
      setValidatingReferral(false);
    }
  };

  const handleContinue = () => {
    setErrors({});

    if (!accountType) {
      setErrors({ accountType: "Please select an account type" });
      return;
    }

    if (!agreeToTerms) {
      setErrors({ terms: "You must agree to the Terms of Service" });
      return;
    }

    if (!agreeToPrivacy) {
      setErrors({ privacy: "You must agree to the Privacy Policy" });
      return;
    }

    if (!consentToSms) {
      setErrors({
        sms: "You must consent to SMS communications for verification",
      });
      return;
    }

    if (hasReferralCode && referralCode && !referralValidated) {
      setErrors({ referral: "Please validate your referral code first" });
      return;
    }

    onContinue({
      accountType,
      referralCode:
        hasReferralCode && referralValidated ? referralCode : undefined,
    });
  };

  const selectedAccountType = accountTypes.find(
    (type) => type.value === accountType
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Get Started with MMF
        </h2>
        <p className="text-muted-foreground">
          Choose your account type to begin your investment journey
        </p>
      </div>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Account Setup</CardTitle>
          <CardDescription>
            Select the type of account that best fits your needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Account Type Selection */}
          <div className="space-y-3">
            <Label>Account Type *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {accountTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${
                      accountType === type.value
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                    onClick={() => setAccountType(type.value)}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">
                          {type.label}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {errors.accountType && (
              <p className="text-sm text-destructive">{errors.accountType}</p>
            )}
          </div>

          {/* Account Type Requirements */}
          {selectedAccountType && (
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <selectedAccountType.icon className="h-4 w-4 text-primary" />
                <h4 className="font-medium">
                  Selected: {selectedAccountType.label}
                </h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {selectedAccountType.description}
              </p>
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">
                  Required Documents:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {selectedAccountType.requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Referral Code Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasReferralCode"
                checked={hasReferralCode}
                onCheckedChange={(checked) => {
                  setHasReferralCode(checked as boolean);
                  if (!checked) {
                    setReferralCode("");
                    setReferralValidated(false);
                  }
                }}
              />
              <Label htmlFor="hasReferralCode">I have a referral code</Label>
            </div>

            {hasReferralCode && (
              <div className="space-y-2">
                <Label htmlFor="referralCode">Referral Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="referralCode"
                    placeholder="Enter your referral code (e.g., MMF-ABC123)"
                    value={referralCode}
                    onChange={(e) => {
                      setReferralCode(e.target.value.toUpperCase());
                      setReferralValidated(false);
                    }}
                    className={`font-mono ${referralValidated ? "border-green-500" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => validateReferral(referralCode)}
                    disabled={!referralCode || validatingReferral}
                  >
                    {validatingReferral ? "Validating..." : "Validate"}
                  </Button>
                </div>
                {referralValidated && (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Referral code validated successfully
                  </p>
                )}
                {errors.referral && (
                  <p className="text-sm text-destructive">{errors.referral}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Optional: Enter the referral code provided by your agent
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <h3 className="font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Legal Agreements & Consent
            </h3>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeToTerms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) =>
                    setAgreeToTerms(checked as boolean)
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
                  <p className="text-xs text-muted-foreground">
                    By agreeing, you accept our terms governing the use of MMF
                    services
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeToPrivacy"
                  checked={agreeToPrivacy}
                  onCheckedChange={(checked) =>
                    setAgreeToPrivacy(checked as boolean)
                  }
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="agreeToPrivacy"
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
                  <p className="text-xs text-muted-foreground">
                    We will handle your personal data in accordance with our
                    privacy policy
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consentToSms"
                  checked={consentToSms}
                  onCheckedChange={(checked) =>
                    setConsentToSms(checked as boolean)
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
                  <div className="p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">SMS Disclaimer:</p>
                        <p>
                          Standard messaging rates may apply. We will send SMS
                          for account verification, security alerts, and
                          important account notifications. You can opt out at
                          any time by replying STOP.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {(errors.terms || errors.privacy || errors.sms) && (
              <div className="text-sm text-destructive">
                {errors.terms || errors.privacy || errors.sms}
              </div>
            )}
          </div>

          <Button onClick={handleContinue} className="w-full" size="lg">
            Continue to Registration
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
