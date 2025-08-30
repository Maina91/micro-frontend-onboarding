import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { useIdentificationTypes } from "@/hooks/useIdentificationTypes";
import { toast } from "sonner";

const passwordRules = [
  { test: (val: string) => val.length >= 8, label: "At least 8 characters" },
  {
    test: (val: string) => /[A-Z]/.test(val),
    label: "Contains uppercase letter",
  },
  {
    test: (val: string) => /[a-z]/.test(val),
    label: "Contains lowercase letter",
  },
  { test: (val: string) => /[0-9]/.test(val), label: "Contains a number" },
];

interface SignupFormProps {
  preSignupData: {
    accountType: string;
    agent_no?: string;
  };
  onBack: () => void;
}

export function SignupForm({ preSignupData, onBack }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Submitted:", { ...preSignupData, ...value });
      toast("Signup successful");
      // TODO: call signupAction({ ...preSignupData, ...value })
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
            {/* First / Last Name */}
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
                      <p className="text-sm text-destructive" role="alert">
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
                      <p className="text-sm text-destructive" role="alert">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Identification */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    {isLoading && (
                      <Select disabled>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Loading..." />
                        </SelectTrigger>
                      </Select>
                    )}
                    {isError && (
                      <p className="text-sm text-destructive">
                        Failed to load identification types
                      </p>
                    )}
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
                            <SelectItem
                              key={type.id}
                              value={type.id.toString()}
                            >
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive" role="alert">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

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
                      <p className="text-sm text-destructive" role="alert">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Password / Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field name="password">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-2.5 text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive" role="alert">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                    {/* Live password rules */}
                    <ul className="mt-2 space-y-1">
                      {passwordRules.map((rule) => {
                        const passed = rule.test(field.state.value);
                        return (
                          <li
                            key={rule.label}
                            className={`flex items-center text-sm ${
                              passed ? "text-green-600" : "text-gray-500"
                            }`}
                          >
                            {passed ? (
                              <CheckCircle size={14} className="mr-1" />
                            ) : (
                              <XCircle size={14} className="mr-1" />
                            )}
                            {rule.label}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </form.Field>

              <form.Field
                name="confirmPassword"
                validators={{
                  onChangeListenTo: ["password"],
                  onChange: ({ value, fieldApi }) =>
                    value !== fieldApi.form.getFieldValue("password")
                      ? "Passwords do not match"
                      : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-1.5">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-2.5 text-gray-500"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive" role="alert">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={form.state.isSubmitting}
            >
              {form.state.isSubmitting ? "Processing..." : "Continue"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
