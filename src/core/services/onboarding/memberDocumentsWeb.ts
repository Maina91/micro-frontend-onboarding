// src/server/services/memberFileService.ts
import { db } from "@/db/client";
import { member_files_web } from "@/db/schema/member_documents_web";
import { eq } from "drizzle-orm";

export const memberDocumentsWebService = {
  create: async (data: {
    member_no: string;
    id_back: string;
    id_front: string;
    kra_pin: string;
    proof_of_bank: string;
    passport_photo: string;
    profile_photo?: string | null;
  }) => {
    try {
      return await db.transaction(async (tx) => {
        const [record] = await tx
          .insert(member_files_web)
          .values({
            ...data,
          })
          .returning();

        if (!record) throw new Error("Failed to insert member file");

        return record;
      });
    } catch (error) {
      console.error("Error creating member file:", error);
      throw new Error(
        `Member file creation failed: ${(error as Error).message}`
      );
    }
  },

  getByMemberNo: async (member_no: string) => {
    try {
      return await db
        .select()
        .from(member_files_web)
        .where(eq(member_files_web.member_no, member_no));
    } catch (error) {
      console.error("Error fetching member files:", error);
      throw new Error(
        `Failed to fetch member files: ${(error as Error).message}`
      );
    }
  },

  update: async (
    id: number,
    data: Partial<{
      id_back: string;
      id_front: string;
      kra_pin: string;
      proof_of_bank: string;
      passport_photo: string;
      profile_photo?: string | null;
    }>
  ) => {
    try {
      return await db.transaction(async (tx) => {
        const [record] = await tx
          .update(member_files_web)
          .set({
            ...data,
            updatedAt: new Date(),
          })
          .where(eq(member_files_web.id, id))
          .returning();

        if (!record) throw new Error("Failed to update member file");

        return record;
      });
    } catch (error) {
      console.error("Error updating member file:", error);
      throw new Error(`Member file update failed: ${(error as Error).message}`);
    }
  },

  softDelete: async (id: number) => {
    try {
      return await db.transaction(async (tx) => {
        const [record] = await tx
          .update(member_files_web)
          .set({
            deletedAt: new Date(),
            updatedAt: new Date(),
          })
          .where(eq(member_files_web.id, id))
          .returning();

        if (!record) throw new Error("Failed to soft delete member file");

        return record;
      });
    } catch (error) {
      console.error("Error deleting member file:", error);
      throw new Error(
        `Member file deletion failed: ${(error as Error).message}`
      );
    }
  },
};
