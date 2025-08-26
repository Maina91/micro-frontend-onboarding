import { useState } from "react";
import { z } from "zod";
import { useRouter } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// ✅ Schema for validation
const loginSchema = z.object({
  identifier: z.string().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["agent", "customer"]),
  deliveryMethod: z.enum(["sms", "email", "authenticator"]),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function SigninPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    identifier: "",
    password: "",
    role: "customer",
    deliveryMethod: "email",
  });

//   const mutation = useMutation({
//     mutationFn: async (data: LoginFormData) => {
//       // Call your login API service
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       if (!res.ok) throw new Error("Login failed");
//       return res.json();
//     },
//     // onSuccess: () => {
//     //   router.navigate({ to: "/dashboard" });
//     // },
//   });

  const handleChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = loginSchema.safeParse(formData);
    if (!parsed.success) {
      console.error(parsed.error.flatten().fieldErrors);
      return;
    }
    // mutation.mutate(parsed.data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Welcome to <br />
            <span className="text-primary">The Investment Platform</span>
          </CardTitle>
          <p className="text-center text-muted-foreground text-sm mt-2">
            Where you imagine more
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <Label>Login as</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(val) => handleChange("role", val)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="customer" id="customer" />
                  <Label htmlFor="customer">Customer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="agent" id="agent" />
                  <Label htmlFor="agent">Agent</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Identifier */}
            <div>
              <Label>Email address or username</Label>
              <Input
                type="text"
                placeholder="Enter email address or username"
                value={formData.identifier}
                onChange={(e) => handleChange("identifier", e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </div>

            {/* Delivery Method */}
            <div>
              <Label>Send Login Token Via</Label>
              <RadioGroup
                value={formData.deliveryMethod}
                onValueChange={(val) => handleChange("deliveryMethod", val)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sms" id="sms" />
                  <Label htmlFor="sms">SMS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email">Email</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Actions */}
            <Button
              type="submit"
              className="w-full"
              //   disabled={mutation.isPending}
            >
              {/* {mutation.isPending ? "Signing in..." : "Send Token"} */}
              Sign In
            </Button>

            <div className="flex justify-between text-sm">
              <a
                href="/onboarding/signup"
                className="text-primary hover:underline"
              >
                Create Account
              </a>
              <a
                href="/onboarding/forgot-password"
                className="text-muted-foreground hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
