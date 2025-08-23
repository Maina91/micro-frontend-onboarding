// src/server/actions/identificationType.ts
import { identificationTypeService } from "@/core/services/onboarding/identificationTypeService";
import { z } from "zod";

export const createIdentificationType = async (input: {
  name: string;
  description?: string;
  added_by: string;
}) => {
  const schema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    added_by: z.string().min(1),
  });

  const data = schema.parse(input);
  return await identificationTypeService.create(data);
};

export const confirmIdentificationType = async (input: {
  id: number;
  username: string;
}) => {
  const schema = z.object({
    id: z.number().int().positive(),
    username: z.string().min(1),
  });

  const { id, username } = schema.parse(input);
  return await identificationTypeService.confirm(id, username);
};

export const getIdentificationTypes = async (input?: { confirmed?: boolean }) => {
  const schema = z.object({ confirmed: z.boolean().optional() });
  const parsed = schema.parse(input || {});
  return await identificationTypeService.get(parsed.confirmed);
};

export const deleteIdentificationType = async (input: { id: number }) => {
  const schema = z.object({ id: z.number().int().positive() });
  const { id } = schema.parse(input);
  return await identificationTypeService.delete(id);
};
