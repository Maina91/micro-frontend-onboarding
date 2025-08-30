import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

import { useForm } from "@tanstack/react-form";
import { useIdentificationTypes } from "@/hooks/useIdentificationTypes";

interface SignupFormProps {
  preSignupData: {
    accountType: string;
    agent_no?: string;
  };
  onBack: () => void;
}

export function SignupForm({ preSignupData, onBack }: SignupFormProps) {
  const {
    data: identificationTypes,
    isLoading,
    isError,
  } = useIdentificationTypes();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      identificationType: "",
      identificationNumber: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Submitted:", value);
      // TODO: hook into signupAction here
    },
  });

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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            {/* First + Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field
                name="firstName"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "First name is required" : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="lastName"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "Last name is required" : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Identification Type */}
            <form.Field
              name="identificationType"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Identification type is required" : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label>Identification Type *</Label>

                  {/* Loading State */}
                  {isLoading && (
                    <Select disabled>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Loading..." />
                      </SelectTrigger>
                    </Select>
                  )}

                  {/* Error State */}
                  {isError && (
                    <p className="text-sm text-destructive">
                      Failed to load identification types
                    </p>
                  )}

                  {/* Success State */}
                  {!isLoading && !isError && identificationTypes && (
                    <Select
                      value={field.state.value}
                      onValueChange={(val) => field.handleChange(val)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="--- Select Identification Type ---" />
                      </SelectTrigger>
                      <SelectContent>
                        {identificationTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id.toString()}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {/* Validation error */}
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Identification Number */}
            <form.Field
              name="identificationNumber"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Identification number is required" : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="identificationNumber">
                    Identification Number *
                  </Label>
                  <Input
                    id="identificationNumber"
                    placeholder="Enter your ID / Passport No."
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={form.state.isSubmitting}
            >
              {form.state.isSubmitting
                ? "Processing..."
                : "Continue"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
