import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
 
const prisma = new PrismaClient();
 
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
}),
trustedOrigins:["http://localhost:5173"],
  emailAndPassword:{
    enabled: true,
    requireEmailVerification: true,
  },
  // socialProviders: {
  //   github: {
  //       clientId: process.env.GITHUB_CLIENT_ID!,
  //       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  //     },
  //     google: {
  //       clientId: process.env.GOOGLE_CLIENT_ID!,
  //       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //     },
  // },
});