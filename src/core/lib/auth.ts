import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = "7d";

export interface User {
  id: string;
  email: string;
  role: "client" | "agent" | "admin";
  firstName: string;
  lastName: string;
  onboardingStatus: "pending" | "in_progress" | "completed" | "rejected";
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Mock user database - replace with real database
const mockUsers: User[] = [
  {
    id: "1",
    email: "client@example.com",
    role: "client",
    firstName: "John",
    lastName: "Doe",
    onboardingStatus: "in_progress",
  },
  {
    id: "2",
    email: "agent@example.com",
    role: "agent",
    firstName: "Jane",
    lastName: "Smith",
    onboardingStatus: "completed",
  },
];

export async function findUserByEmail(email: string): Promise<User | null> {
  return mockUsers.find((user) => user.email === email) || null;
}

export async function createUser(userData: Partial<User>): Promise<User> {
  const newUser: User = {
    id: (mockUsers.length + 1).toString(),
    email: userData.email!,
    role: userData.role || "client",
    firstName: userData.firstName!,
    lastName: userData.lastName!,
    onboardingStatus: "pending",
  };
  mockUsers.push(newUser);
  return newUser;
}
