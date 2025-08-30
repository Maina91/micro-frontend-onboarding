import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ArrowRight, AlertCircle } from "lucide-react";
import { useAccountTypes } from "@/hooks/useAccountTypes";
import { useAgents } from "@/hooks/useAgent";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";

interface PreSignupFormProps {
  defaultValues?: {
    accountType?: string;
    agent?: string;
    agreeToTermsPrivacy?: boolean;
    consentToSms?: boolean;
  };
  onContinue: (data: {
    accountType: string;
    agent?: string;
    agreeToTermsPrivacy: boolean;
    consentToSms: boolean;
  }) => void;
}

// ✅ Schema for validation
const PreSignupSchema = z.object({
  accountType: z.string().nonempty("Please select an account type"),
  agent: z.string().optional(),
  referredByAgent: z.boolean().default(false),
  agreeToTermsPrivacy: z.boolean().refine((val) => val, {
    message: "You must agree to the Terms and Privacy Policy",
  }),
  consentToSms: z.boolean().refine((val) => val, {
    message: "You must consent to SMS communications for verification",
  }),
});

export function PreSignupForm({
  defaultValues,
  onContinue,
}: PreSignupFormProps) {
  const { data: accountTypes, isLoading, isError } = useAccountTypes();
  const {
    data: agents,
    isLoading: agentsLoading,
    isError: agentsError,
  } = useAgents();

  // ✅ Setup TanStack Form
  const form = useForm({
    defaultValues: {
      accountType: defaultValues?.accountType ?? "",
      agent: defaultValues?.agent ?? "",
      referredByAgent: !!defaultValues?.agent,
      agreeToTermsPrivacy: defaultValues?.agreeToTermsPrivacy ?? false,
      consentToSms: defaultValues?.consentToSms ?? false,
    },
    onSubmit: async ({ value }) => {
      onContinue(value);
    },
    // validatorAdapter: (rawValues) => {
    //   const result = PreSignupSchema.safeParse(rawValues);
    //   if (!result.success) {
    //     return result.error.formErrors.fieldErrors;
    //   }
    //   return {};
    // },
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-muted-foreground">
          Choose your account type to begin your investment journey
        </p>
      </div>

      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="space-y-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            {/* Account Type */}
            <form.Field name="accountType">
              {(field) => (
                <div className="space-y-2">
                  <Label>Account Type *</Label>

                  {isLoading ? (
                    <Select disabled>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Loading account types..." />
                      </SelectTrigger>
                    </Select>
                  ) : isError ? (
                    <p className="text-sm text-destructive">
                      Failed to load account types
                    </p>
                  ) : (
                    <Select
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="--- Select account type ---" />
                      </SelectTrigger>
                      <SelectContent>
                        {accountTypes?.map((type: any) => (
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

                  {field.state.meta.errors[0] && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Referral Agent */}
            <form.Field name="referredByAgent">
              {(refField) => (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={refField.state.value}
                      onCheckedChange={(checked) =>
                        refField.handleChange(!!checked)
                      }
                    />
                    <Label>I was referred by an agent</Label>
                  </div>

                  {refField.state.value && (
                    <form.Field name="agent">
                      {(agentField) => (
                        <div className="space-y-2">
                          <Label>Select Agent</Label>
                          {agentsLoading ? (
                            <p className="text-sm text-muted-foreground">
                              Loading agents...
                            </p>
                          ) : agentsError ? (
                            <p className="text-sm text-destructive">
                              Failed to load agents
                            </p>
                          ) : (
                            <Select
                              value={agentField.state.value}
                              onValueChange={agentField.handleChange}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose an agent" />
                              </SelectTrigger>
                              <SelectContent>
                                {agents?.map((a: any) => (
                                  <SelectItem
                                    key={a.agent_no}
                                    value={a.agent_no}
                                  >
                                    {a.name} || {a.agent_no}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}

                          {agentField.state.meta.errors[0] && (
                            <p className="text-sm text-destructive">
                              {agentField.state.meta.errors[0]}
                            </p>
                          )}
                        </div>
                      )}
                    </form.Field>
                  )}
                </div>
              )}
            </form.Field>

            {/* Terms & Consent */}
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <form.Field name="agreeToTermsPrivacy">
                {(field) => (
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={field.state.value}
                      onCheckedChange={(checked) =>
                        field.handleChange(!!checked)
                      }
                    />
                    <Label className="text-sm font-normal inline">
                      By continuing, you agree to our{" "}
                      <a
                        href="/terms-of-use"
                        className="text-primary underline"
                      >
                        Terms of Use
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy-policy"
                        className="text-primary underline"
                      >
                        Privacy Policy
                      </a>
                    </Label>
                    {field.state.meta.errors[0] && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field name="consentToSms">
                {(field) => (
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={field.state.value}
                      onCheckedChange={(checked) =>
                        field.handleChange(!!checked)
                      }
                    />
                    <div className="space-y-1">
                      <Label className="text-sm font-normal">
                        I consent to receive SMS for account verification *
                      </Label>
                      <div className="p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-3 w-3 mt-0.5" />
                          <div>
                            <p className="font-medium">SMS Disclaimer:</p>
                            <p>
                              Standard messaging rates may apply. You can opt
                              out at any time.
                            </p>
                          </div>
                        </div>
                      </div>
                      {field.state.meta.errors[0] && (
                        <p className="text-sm text-destructive">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </form.Field>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Continue to Registration <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
