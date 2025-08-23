// src/server/actions/memberFile.ts
import { memberDocumentsWebService } from "@/core/services/onboarding/memberDocumentsWeb";
import { z } from "zod";

// ------------------------
// Create Member File
// ------------------------
export const createMemberFile = async (input: {
  member_no: string;
  id_back: string;
  id_front: string;
  kra_pin: string;
  proof_of_bank: string;
  passport_photo: string;
  profile_photo?: string | null;
}) => {
  const schema = z.object({
    member_no: z.string().min(1),
    id_back: z.string().min(1),
    id_front: z.string().min(1),
    kra_pin: z.string().min(1),
    proof_of_bank: z.string().min(1),
    passport_photo: z.string().min(1),
    profile_photo: z.string().optional().nullable(),
  });

  const data = schema.parse(input);
  return await memberDocumentsWebService.create(data);
};

// ------------------------
// Get Member Files
// ------------------------
export const getMemberFilesByMemberNo = async (input: {
  member_no: string;
}) => {
  const schema = z.object({ member_no: z.string().min(1) });
  const { member_no } = schema.parse(input);
  return await memberDocumentsWebService.getByMemberNo(member_no);
};

// ------------------------
// Update Member File
// ------------------------
export const updateMemberFile = async (
  input: { id: number } & Partial<{
    id_back: string;
    id_front: string;
    kra_pin: string;
    proof_of_bank: string;
    passport_photo: string;
    profile_photo?: string | null;
  }>
) => {
  const schema = z.object({
    id: z.number().int().positive(),
    id_back: z.string().optional(),
    id_front: z.string().optional(),
    kra_pin: z.string().optional(),
    proof_of_bank: z.string().optional(),
    passport_photo: z.string().optional(),
    profile_photo: z.string().optional().nullable(),
  });

  const data = schema.parse(input);
  const { id, ...updateData } = data;
  return await memberDocumentsWebService.update(id, updateData);
};

// ------------------------
// Soft Delete Member File
// ------------------------
export const softDeleteMemberFile = async (input: { id: number }) => {
  const schema = z.object({ id: z.number().int().positive() });
  const { id } = schema.parse(input);
  return await memberDocumentsWebService.softDelete(id);
};
