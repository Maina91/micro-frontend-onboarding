// src/server/actions/currency.ts
import { currencyService } from "@/core/services/onboarding/currencyService";
import { z } from "zod";

export const createCurrency = async (input: {
  name: string;
  code: string;
  added_by: string;
}) => {
  const schema = z.object({
    name: z.string().min(1),
    code: z.string().min(1),
    added_by: z.string().min(1),
  });

  const data = schema.parse(input);
  return await currencyService.create(data);
};

export const confirmCurrency = async (input: {
  id: number;
  username: string;
}) => {
  const schema = z.object({
    id: z.number().int().positive(),
    username: z.string().min(1),
  });

  const { id, username } = schema.parse(input);
  return await currencyService.confirm(id, username);
};

export const getCurrencies = async (input?: { confirmed?: boolean }) => {
  const schema = z.object({ confirmed: z.boolean().optional() });
  const parsed = schema.parse(input || {});
  return await currencyService.get(parsed.confirmed);
};

export const deleteCurrency = async (input: { id: number }) => {
  const schema = z.object({ id: z.number().int().positive() });
  const { id } = schema.parse(input);
  return await currencyService.delete(id);
};
