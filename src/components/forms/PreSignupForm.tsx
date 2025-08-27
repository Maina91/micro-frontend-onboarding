import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAccountTypes } from "@/hooks/useAccountTypes";
import { useAgents } from "@/hooks/useAgent";

interface PreSignupFormProps {
  onContinue: (data: { accountType: string; referralCode?: string }) => void;
}

export function PreSignupForm({ onContinue }: PreSignupFormProps) {
  const { data: accountTypes, isLoading, isError } = useAccountTypes();
  const { data: agents, isLoading: agentsLoading, isError: agentsError } = useAgents();
  const [accountType, setAccountType] = useState("");
  const [agent, setAgent] = useState("");
  const [agreeToTermsPrivacy, setAgreeToTermsPrivacy] = useState(false);
  const [referredByAgent, setReferredByAgent] = useState(false);
  const [consentToSms, setConsentToSms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});


  const handleContinue = () => {
    setErrors({});

    if (!accountType) {
      setErrors({ accountType: "Please select an account type" });
      return;
    }

    if (!agreeToTermsPrivacy) {
      setErrors({ privacy: "You must agree to the Terms and Privacy Policy" });
      return;
    }

    if (!consentToSms) {
      setErrors({
        sms: "You must consent to SMS communications for verification",
      });
      return;
    }

    if (referredByAgent && !agent) {
      setErrors({ agent: "Please select an agent" });
      return;
    }

    onContinue({
      accountType,
    });
  };

  const selectedAccountType = accountTypes?.find(
    (type) => type.id.toString() === accountType
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
        <CardContent className="space-y-6">
          {/* accountTypes */}
          <div className="space-y-3">
            <Label>Account Type *</Label>

            {/* Loading State */}
            {isLoading && (
              <Select disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Loading account types..." />
                </SelectTrigger>
              </Select>
            )}

            {/* Error State */}
            {isError && (
              <p className="text-sm text-destructive">
                Failed to load account types
              </p>
            )}

            {/* Success State */}
            {!isLoading && !isError && accountTypes && (
              <Select
                value={accountType || ""}
                onValueChange={(val) => setAccountType(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="---Select account type---" />
                </SelectTrigger>
                <SelectContent>
                  {accountTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      <div className="flex flex-col">
                        <span className="font-medium">{type.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {type.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* Validation error */}
            {errors.accountType && (
              <p className="text-sm text-destructive">{errors.accountType}</p>
            )}
          </div>

          {/* Agent Referral Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasAgent"
                checked={referredByAgent}
                onCheckedChange={(checked) => {
                  setReferredByAgent(checked as boolean);
                  if (!checked) setAgent("");
                }}
              />
              <Label htmlFor="hasAgent">I was referred by an agent</Label>
            </div>

            {referredByAgent && (
              <div className="space-y-2">
                <Label htmlFor="agentSelect">Select Agent</Label>

                {agentsLoading ? (
                  <p className="text-sm text-muted-foreground">
                    Loading agents...
                  </p>
                ) : agentsError ? (
                  <p className="text-sm text-destructive">
                    Failed to load agents
                  </p>
                ) : (
                  <Select value={agent} onValueChange={setAgent}>
                    <SelectTrigger id="agentSelect" className="w-full">
                      <SelectValue placeholder="Choose an agent" />
                    </SelectTrigger>
                    <SelectContent>
                      {agents?.map((a: any) => (
                        <SelectItem key={a.agent_no} value={a.agent_no}>
                          {a.name} ({a.agent_no})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {errors.agent && (
                  <p className="text-sm text-destructive">{errors.agent}</p>
                )}

                <p className="text-xs text-muted-foreground">
                  Optional: Select the agent who referred you, if any.
                </p>
              </div>
            )}
          </div>

          {/* Legal Agreements & Consent */}
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeToTermsPrivacy"
                  checked={agreeToTermsPrivacy}
                  onCheckedChange={(checked) =>
                    setAgreeToTermsPrivacy(checked as boolean)
                  }
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="agreeToTermsPrivacy"
                    className="text-sm font-normal cursor-pointer inline"
                  >
                    By continuing, you agree to our{" "}
                    <a
                      href="/terms-of-use"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Terms of Use
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy-policy"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Privacy Policy
                    </a>
                  </Label>
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
                          any time.
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
