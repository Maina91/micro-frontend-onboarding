import { useForm } from "@tanstack/react-form";
import { useSecurities } from "@/hooks/useSecurities";
import { z } from "zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const investSchema = z
  .object({
    security: z.string().min(1, "Please select a security"),
    amount: z
      .number()
      .positive("Amount must be greater than 0")
      .max(10000000, "Amount too large"),
    paymentMethod: z.string().min(1, "Select a payment method"),
    sourceOfFunds: z.string().min(1, "Select source of funds"),
    sourceOfFundsOther: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.sourceOfFunds === "other") {
        return !!data.sourceOfFundsOther?.trim();
      }
      return true;
    },
    {
      message: "Please specify your source of funds",
      path: ["sourceOfFundsOther"],
    }
  );

type InvestFormValues = z.infer<typeof investSchema>;

export function InvestPage() {
  const { data: securities, isLoading, error } = useSecurities();
  const form = useForm({
    defaultValues: {
      security: "",
      amount: 0,
      paymentMethod: "",
      sourceOfFunds: "",
      sourceOfFundsOther: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Investment submitted:", value);
      toast("Investment submitted successfully");
    },
  });

  return (
    <div className="space-y-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <form.Field
          name="security"
          validators={{
            onChange: ({ value }) =>
              !value ? "Please select a security" : undefined,
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="security">Select Security *</Label>
              {isLoading && (
                <Select disabled>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Loading..." />
                  </SelectTrigger>
                </Select>
              )}
              {error && (
                <Select disabled>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Error loading" />
                  </SelectTrigger>
                </Select>
              )}
              {!isLoading && !error && securities && (
                <Select
                  value={field.state.value}
                  onValueChange={(val) => field.handleChange(val)}
                >
                  <SelectTrigger id="security" className="w-full">
                    <SelectValue placeholder="---Select Security---" />
                  </SelectTrigger>
                  <SelectContent>
                    {securities?.map((type) => (
                      <SelectItem key={type.id} value={type.id.toString()}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {field.state.meta.errors && (
                <p className="text-red-500 text-sm">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="amount"
          validators={{
            onChange: ({ value }) =>
              !value ? "Amount is required" : undefined,
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
              {field.state.meta.errors && (
                <p className="text-red-500 text-sm">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="paymentMethod"
          validators={{
            onChange: ({ value }) =>
              !value ? "Payment method is required" : undefined,
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method *</Label>
              <Select
                value={field.state.value}
                onValueChange={(val) => field.handleChange(val)}
              >
                <SelectTrigger id="paymentMethod" className="w-full">
                  <SelectValue placeholder="---Select Payment Method---" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mpesa">M-Pesa</SelectItem>
                  <SelectItem value="bank">Bank Deposit/Transfer</SelectItem>
                </SelectContent>
              </Select>
              {field.state.meta.errors && (
                <p className="text-red-500 text-sm">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="sourceOfFunds"
          validators={{
            onChange: ({ value }) =>
              !value ? "Source of funds is required" : undefined,
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="sourceOfFunds">Source of Funds *</Label>
              <Select
                value={field.state.value}
                onValueChange={(val) => field.handleChange(val)}
              >
                <SelectTrigger id="sourceOfFunds" className="w-full">
                  <SelectValue placeholder="---Select source of funds---" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salary">Employment Income</SelectItem>
                  <SelectItem value="business">Business Income</SelectItem>
                  <SelectItem value="investment">
                    Investments/Savings
                  </SelectItem>
                  <SelectItem value="loan">Loan</SelectItem>
                  <SelectItem value="pension">Pension</SelectItem>
                  <SelectItem value="inheritance">Inheritance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              {/* Render the "Other" input reactively inside this field */}
              {field.state.value === "other" && (
                <form.Field name="sourceOfFundsOther">
                  {(otherField) => (
                    <div className="space-y-2">
                      <Label htmlFor="sourceOfFundsOther">
                        Please specify source of funds
                      </Label>
                      <Input
                        id="sourceOfFundsOther"
                        type="text"
                        placeholder="Enter source of funds"
                        value={otherField.state.value || ""}
                        onChange={(e) =>
                          otherField.handleChange(e.target.value)
                        }
                      />
                      {otherField.state.meta.errors?.length > 0 && (
                        <p className="text-red-500 text-sm">
                          {otherField.state.meta.errors.join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
              )}

              {field.state.meta.errors?.length > 0 && (
                <p className="text-red-500 text-sm">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <Button type="submit" className="w-full">
          Invest
        </Button>
      </form>
    </div>
  );
}
