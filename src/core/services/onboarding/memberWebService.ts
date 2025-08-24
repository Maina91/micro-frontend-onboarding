// src/server/services/memberService.ts
import { db } from "@/db/client";
import { members_web } from "@/db/schema/member_web";
import { eq } from "drizzle-orm";

export const memberService = {
  // Create a new member (staged)
  create: async (data: {
    member_no: string;
    member_type: string;
    first_name: string;
    last_name: string;
    identification_no: string;
    identification_type_id: number;
    dob: Date;
    gender: string;
    mobile_no: string;
    email_address: string;
    salutation?: string;
    other_name?: string;
    telephone_no?: string;
    postal_address?: string;
    postal_code?: string;
    town_id?: number;
    country_id?: number;
    county_state?: string;
    physical_address?: string;
    resident?: boolean;
    nationality?: string;
  }) => {
    try {
      return await db.transaction(async (tx) => {
        const [record] = await tx
          .insert(members_web)
          .values({
            ...data,
            dob: data.dob.toISOString().split("T")[0],
          })
          .returning();

        if (!record) throw new Error("Failed to create member");

        return record;
      });
    } catch (error) {
      console.error("Error creating member:", error);
      throw new Error(`Member creation failed: ${(error as Error).message}`);
    }
  },

  // Partial update for member (allowing staged updates)
  update: async (
    id: number,
    data: Partial<{
      member_type: string;
      salutation: string;
      first_name: string;
      last_name: string;
      other_name: string;
      identification_no: string;
      identification_type_id: number;
      dob: Date;
      gender: string;
      telephone_no: string;
      mobile_no: string;
      email_address: string;
      postal_address: string;
      postal_code: string;
      town_id: number;
      country_id: number;
      county_state: string;
      physical_address: string;
      resident: boolean;
      nationality: string;
    }>
  ) => {
    try {
      return await db.transaction(async (tx) => {
        // convert dob if it's a Date
        const updateData: any = {
          ...data,
          updated_at: new Date(),
        };

        if (data.dob instanceof Date) {
          updateData.dob = data.dob.toISOString().split("T")[0];
        }

        const [record] = await tx
          .update(members_web)
          .set(updateData)
          .where(eq(members_web.id, id))
          .returning();

        if (!record) throw new Error("Failed to update member");

        return record;
      });
    } catch (error) {
      console.error("Error updating member:", error);
      throw new Error(`Member update failed: ${(error as Error).message}`);
    }
  },

  // Get members by ID or all
  get: async (member_no: string) => {
      try {
          return await db
              .select()
              .from(members_web)
              .where(eq(members_web.member_no, member_no));
    } catch (error) {
      console.error("Error fetching members:", error);
      throw new Error(`Failed to fetch members: ${(error as Error).message}`);
    }
    },

  // Soft delete member
  softDelete: async (id: number) => {
    try {
      return await db.transaction(async (tx) => {
        const [record] = await tx
          .update(members_web)
          .set({
            deleted_at: new Date(),
            updated_at: new Date(),
          })
          .where(eq(members_web.id, id))
          .returning();

        if (!record) throw new Error("Failed to soft delete member");

        return record;
      });
    } catch (error) {
      console.error("Error deleting member:", error);
      throw new Error(`Member deletion failed: ${(error as Error).message}`);
    }
  },
};
