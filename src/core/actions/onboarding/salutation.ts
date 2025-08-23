// src/server/actions/salutation.ts
import { salutationService } from "@/core/services/onboarding/salutationService";
import { z } from "zod";

export const createSalutation = async (input: {
  name: string;
  description?: string;
  added_by: string;
}) => {
  // Validate input
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    added_by: z.string().min(1, "Added_by is required"),
  });
  const data = schema.parse(input);

  return await salutationService.create(data);
};

export const confirmSalutation = async (input: {
  id: number;
  username: string;
}) => {
  const schema = z.object({
    id: z.number().int().positive(),
    username: z.string().min(1),
  });
  const { id, username } = schema.parse(input);

  return await salutationService.confirm(id, username);
};

export const getSalutations = async (input?: { confirmed?: boolean }) => {
  const schema = z.object({ confirmed: z.boolean().optional() });
  const parsed = schema.parse(input || {}); 

  return await salutationService.get(parsed.confirmed);
};

export const deleteSalutation = async (input: { id: number }) => {
  const schema = z.object({ id: z.number().int().positive() });
  const { id } = schema.parse(input);

  return await salutationService.delete(id);
};
