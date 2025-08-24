// import { db } from "@/db/client";
// import { otp_codes } from "@/db/schema/otp_codes";
// import { eq, and } from "drizzle-orm";

// export const phoneVerificationService = {
//   verifyOtp: async (userId: number, otp: string) => {
//     try {
//       const now = new Date();

//       // Fetch OTP record
//       const [otpRecord] = await db
//         .select()
//         .from(otp_codes)
//         .where(
//           and(
//             eq(otp_codes.user_id, userId),
//             eq(otp_codes.code, otp),
//             eq(otp_codes.type, "phone"),
//             eq(otp_codes.purpose, "verification")
//           )
//         );

//       if (!otpRecord) {
//         throw new Error("Invalid OTP");
//       }

//       if (otpRecord.expires_at < now) {
//         throw new Error("OTP has expired");
//       }

//       // Mark OTP as verified
//       await db
//         .update(otp_codes)
//         .set({ verified: true, verified_at: now })
//         .where(eq(otp_codes.id, otpRecord.id));

//       return { success: true, message: "Phone verified successfully" };
//     } catch (error) {
//       console.error("[PHONE_VERIFICATION_ERROR]", error);
//       return { success: false, error: (error as Error).message };
//     }
//   },
// };
