import { useState } from "react";
import { useForm } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod";
import {
  passwordSchema,
  type PasswordFormData,
} from "@/core/validators/password.schema";
// import { setPasswordFn } from "@/core/services/onboarding/passwordService";

export default function PasswordPage() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    // const result = await setPasswordFn(values);
    // if (result.success) {
    //   setSuccessMessage(result.message);
    // }
  });

  const { watch, register, formState } = form;
  const password = watch("password");

  const checks = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    {
      label: "At least one uppercase letter (A-Z)",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "At least one lowercase letter (a-z)",
      valid: /[a-z]/.test(password),
    },
    { label: "At least one number (0-9)", valid: /\d/.test(password) },
  ];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Create Your Password</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Enter Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border rounded p-2"
          />
          {formState.errors.password && (
            <p className="text-red-500 text-sm">
              {formState.errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Repeat Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full border rounded p-2"
          />
          {formState.errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          {checks.map((check) => (
            <p
              key={check.label}
              className={`text-sm ${check.valid ? "text-green-600" : "text-red-600"}`}
            >
              {check.valid ? "✅" : "❌"} {check.label}
            </p>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Create Password
        </button>
      </form>

      {successMessage && (
        <p className="mt-4 text-green-600 font-medium">{successMessage}</p>
      )}
    </div>
  );
}
    