// import { createServerFn } from "@tanstack/start";
// import { db } from "../../../db/client";
// import { referrals, users, auditLogs } from "../../../db/schema";
// import { eq, and, desc, count } from "drizzle-orm";
// import { nanoid } from "nanoid";

// // Generate referral code server action
// export const generateReferralCode = createServerFn(
//   "POST",
//   async (data: {
//     agentId: string;
//     maxUses?: number;
//     commissionRate?: number;
//   }) => {
//     try {
//       // Verify agent exists and has agent role
//       const agent = await db
//         .select()
//         .from(users)
//         .where(and(eq(users.id, data.agentId), eq(users.role, "agent")))
//         .limit(1);

//       if (!agent.length) {
//         throw new Error("Agent not found or invalid role");
//       }

//       // Generate unique referral code
//       const referralCode = `MMF-${nanoid(8).toUpperCase()}`;

//       // Create referral record
//       const [newReferral] = await db
//         .insert(referrals)
//         .values({
//           agentId: data.agentId,
//           referralCode,
//           maxUses: data.maxUses || null,
//           commissionRate: data.commissionRate || 500, // 5% default
//           isActive: true,
//           currentUses: 0,
//         })
//         .returning();

//       // Log the action
//       await db.insert(auditLogs).values({
//         userId: data.agentId,
//         action: "generate_referral_code",
//         resource: "referrals",
//         resourceId: newReferral.id,
//         details: {
//           referralCode,
//           maxUses: data.maxUses,
//           commissionRate: data.commissionRate,
//         },
//       });

//       return { success: true, referral: newReferral };
//     } catch (error) {
//       console.error("Error generating referral code:", error);
//       return { success: false, error: "Failed to generate referral code" };
//     }
//   }
// );

// // Get agent referrals server action
// export const getAgentReferrals = createServerFn(
//   "GET",
//   async (agentId: string) => {
//     try {
//       const agentReferrals = await db
//         .select({
//           id: referrals.id,
//           referralCode: referrals.referralCode,
//           isActive: referrals.isActive,
//           maxUses: referrals.maxUses,
//           currentUses: referrals.currentUses,
//           commissionRate: referrals.commissionRate,
//           createdAt: referrals.createdAt,
//         })
//         .from(referrals)
//         .where(eq(referrals.agentId, agentId))
//         .orderBy(desc(referrals.createdAt));

//       return { success: true, referrals: agentReferrals };
//     } catch (error) {
//       console.error("Error fetching agent referrals:", error);
//       return { success: false, error: "Failed to fetch referrals" };
//     }
//   }
// );

// // Get referral analytics server action
// export const getReferralAnalytics = createServerFn(
//   "GET",
//   async (agentId: string) => {
//     try {
//       // Get total referrals count
//       const [totalReferrals] = await db
//         .select({ count: count() })
//         .from(referrals)
//         .where(eq(referrals.agentId, agentId));

//       // Get active referrals count
//       const [activeReferrals] = await db
//         .select({ count: count() })
//         .from(referrals)
//         .where(
//           and(eq(referrals.agentId, agentId), eq(referrals.isActive, true))
//         );

//       // Get total successful referrals (users who completed onboarding)
//       const [successfulReferrals] = await db
//         .select({ count: count() })
//         .from(users)
//         .innerJoin(referrals, eq(users.referredBy, referrals.id))
//         .where(
//           and(
//             eq(referrals.agentId, agentId),
//             eq(users.onboardingCompleted, true)
//           )
//         );

//       // Get recent referred users
//       const recentReferredUsers = await db
//         .select({
//           id: users.id,
//           email: users.email,
//           status: users.status,
//           onboardingCompleted: users.onboardingCompleted,
//           createdAt: users.createdAt,
//           referralCode: referrals.referralCode,
//         })
//         .from(users)
//         .innerJoin(referrals, eq(users.referredBy, referrals.id))
//         .where(eq(referrals.agentId, agentId))
//         .orderBy(desc(users.createdAt))
//         .limit(10);

//       return {
//         success: true,
//         analytics: {
//           totalReferrals: totalReferrals.count,
//           activeReferrals: activeReferrals.count,
//           successfulReferrals: successfulReferrals.count,
//           recentReferredUsers,
//         },
//       };
//     } catch (error) {
//       console.error("Error fetching referral analytics:", error);
//       return { success: false, error: "Failed to fetch analytics" };
//     }
//   }
// );

// // Validate referral code server action
// export const validateReferralCode = createServerFn(
//   "POST",
//   async (referralCode: string) => {
//     try {
//       const referral = await db
//         .select({
//           id: referrals.id,
//           agentId: referrals.agentId,
//           referralCode: referrals.referralCode,
//           isActive: referrals.isActive,
//           maxUses: referrals.maxUses,
//           currentUses: referrals.currentUses,
//           commissionRate: referrals.commissionRate,
//         })
//         .from(referrals)
//         .where(eq(referrals.referralCode, referralCode))
//         .limit(1);

//       if (!referral.length) {
//         return { success: false, error: "Invalid referral code" };
//       }

//       const ref = referral[0];

//       // Check if referral is active
//       if (!ref.isActive) {
//         return { success: false, error: "Referral code is inactive" };
//       }

//       // Check if referral has reached max uses
//       if (ref.maxUses && ref.currentUses >= ref.maxUses) {
//         return {
//           success: false,
//           error: "Referral code has reached maximum uses",
//         };
//       }

//       return { success: true, referral: ref };
//     } catch (error) {
//       console.error("Error validating referral code:", error);
//       return { success: false, error: "Failed to validate referral code" };
//     }
//   }
// );

// // Toggle referral status server action
// export const toggleReferralStatus = createServerFn(
//   "POST",
//   async (data: { referralId: string; agentId: string }) => {
//     try {
//       // Get current referral
//       const [currentReferral] = await db
//         .select()
//         .from(referrals)
//         .where(
//           and(
//             eq(referrals.id, data.referralId),
//             eq(referrals.agentId, data.agentId)
//           )
//         )
//         .limit(1);

//       if (!currentReferral) {
//         return { success: false, error: "Referral not found" };
//       }

//       // Toggle status
//       const [updatedReferral] = await db
//         .update(referrals)
//         .set({
//           isActive: !currentReferral.isActive,
//           updatedAt: new Date(),
//         })
//         .where(eq(referrals.id, data.referralId))
//         .returning();

//       // Log the action
//       await db.insert(auditLogs).values({
//         userId: data.agentId,
//         action: "toggle_referral_status",
//         resource: "referrals",
//         resourceId: data.referralId,
//         details: {
//           previousStatus: currentReferral.isActive,
//           newStatus: updatedReferral.isActive,
//         },
//       });

//       return { success: true, referral: updatedReferral };
//     } catch (error) {
//       console.error("Error toggling referral status:", error);
//       return { success: false, error: "Failed to toggle referral status" };
//     }
//   }
// );
