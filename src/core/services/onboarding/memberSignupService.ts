// import { db } from "@/db/client";
// import { members_web } from "@/db/schema/member_web";
// import { z } from "zod";
// import { hashPassword, generateOTP } from "@/core/lib/auth";
// import {
//   createUser,
//   createOtpCode,
//   createOnboardingSession,
//   createAuditLog,
// } from "@/core/lib/database";
// // import { findUserByEmail } from "@/core/lib/user";
// // import { validateReferralCode } from "./referrals";

// type SignupPayload = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   password: string;
//   confirmPassword: string;
//   accountType: string;
//   referralCode?: string;
// };

// const signup = async (data: SignupPayload) => {
//   // 1. Check if user exists
//   const existingUser = await findUserByEmail(data.email);
//   if (existingUser) {
//     return {
//       success: false,
//       error: "An account with this email already exists",
//     };
//   }

//   // 2. Handle referral
//   let referralId: number | null = null;
//   if (data.referralCode) {
//     const referralResult = await validateReferralCode(data.referralCode);
//     if (!referralResult.success) {
//       return { success: false, error: referralResult.error };
//     }
//     referralId = referralResult.referral?.id || null;
//   }

//   // 3. Hash password
//   const hashedPassword = await hashPassword(data.password);

//   // 4. Create user
//   const user = await createUser({
//     email: data.email,
//     phone: data.phone,
//     passwordHash: hashedPassword,
//     role: "client",
//     accountType: data.accountType,
//     referredBy: referralId,
//   });

//   // 5. Generate phone OTP
//   const otpCode = generateOTP();
//   const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
//   await createOtpCode({
//     userId: user.id,
//     code: otpCode,
//     type: "phone",
//     purpose: "verification",
//     expiresAt: otpExpiry,
//   });

//   // 6. Create onboarding session
//   await createOnboardingSession({
//     userId: user.id,
//     currentStep: "verify-phone",
//     completedSteps: ["signup"],
//     sessionData: {
//       firstName: data.firstName,
//       lastName: data.lastName,
//       accountType: data.accountType,
//       referralCode: data.referralCode,
//     },
//     expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
//   });

//   // 7. Audit log
//   await createAuditLog({
//     userId: user.id,
//     action: "user_signup",
//     resource: "users",
//     resourceId: user.id,
//     details: {
//       email: data.email,
//       accountType: data.accountType,
//       hasReferral: !!referralId,
//     },
//   });

//   console.log(`[OTP] Generated phone OTP for ${data.email}: ${otpCode}`);

//   return {
//     success: true,
//     data: {
//       userId: user.id,
//       email: user.email,
//       phone: user.phone,
//       nextStep: "verify-phone",
//       requiresPhoneVerification: true,
//     },
//   };
// };

// export const memberService = {
//   signup,
// };
